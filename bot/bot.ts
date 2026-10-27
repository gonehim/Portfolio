import 'dotenv/config';
import { Telegraf } from 'telegraf';
import { fetchPortfolioJson, updatePortfolioJson } from './github.ts';
import { parseEditFromMessage } from './parseEdit.ts';
import { applyEdit } from './applyEdit.ts';

const { TELEGRAM_BOT_TOKEN, AUTHORIZED_USER_IDS, GH_TOKEN, GH_REPO, DEEPSEEK_API_KEY } = process.env;

for (const [name, value] of Object.entries({
  TELEGRAM_BOT_TOKEN,
  AUTHORIZED_USER_IDS,
  GH_TOKEN,
  GH_REPO,
  DEEPSEEK_API_KEY,
})) {
  if (!value) {
    throw new Error(`${name} is not set. Copy .env.example to .env and fill it in.`);
  }
}

const authorizedUserIds = new Set(
  AUTHORIZED_USER_IDS!.split(',').map((id) => Number(id.trim())),
);

const bot = new Telegraf(TELEGRAM_BOT_TOKEN!);

// Whitelist gate: every update must come from an authorized Telegram user ID,
// or it's rejected before any command/message handler below runs.
bot.use(async (ctx, next) => {
  const userId = ctx.from?.id;
  if (!userId || !authorizedUserIds.has(userId)) {
    console.warn(`Rejected update from unauthorized user ID: ${userId}`);
    return;
  }
  return next();
});

bot.start((ctx) =>
  ctx.reply(
    'Portfolio bot is online. Send me a message describing a portfolio update ' +
      '(e.g. "add a new project called X..." or "update my email to Y") and I will ' +
      'validate it and commit it to data/portfolio.json.',
  ),
);

bot.on('text', async (ctx) => {
  const text = ctx.message.text;
  if (text.startsWith('/')) return;

  try {
    await ctx.sendChatAction('typing');

    const { content: current, sha } = await fetchPortfolioJson(GH_REPO!, GH_TOKEN!);
    const edit = await parseEditFromMessage(text, current);
    const updated = applyEdit(current, edit);
    await updatePortfolioJson(GH_REPO!, GH_TOKEN!, updated, sha, `bot: ${edit.summary}`);

    await ctx.reply(
      `✅ Updated "${edit.section}" (${edit.mode}): ${edit.summary}\n` +
        'Pushed to main — the site will redeploy automatically in a couple of minutes.',
    );
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : 'Unknown error.';
    await ctx.reply(`⚠️ Couldn't apply that update: ${message}`);
  }
});

bot.launch();
console.log('Portfolio bot started (long polling).');

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
