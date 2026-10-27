import OpenAI from 'openai';
import { SECTION_SCHEMAS, type SectionKey } from './schema.ts';

const deepseek = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com',
});

export interface ProposedEdit {
  section: SectionKey;
  mode: 'merge' | 'append' | 'replace';
  value: unknown;
  summary: string;
}

const SECTION_KEYS = Object.keys(SECTION_SCHEMAS);

// Turns a free-form Telegram message into ONE structured edit against the
// current portfolio.json, using tool-forcing so the model must return data
// shaped like ProposedEdit. This is a proposal only — applyEdit.ts is what
// actually validates it field-by-field before anything gets written.
export async function parseEditFromMessage(
  message: string,
  currentPortfolio: unknown,
): Promise<ProposedEdit> {
  const response = await deepseek.chat.completions.create({
    model: 'deepseek-chat',
    messages: [
      {
        role: 'system',
        content:
          "You turn a portfolio owner's free-form Telegram message into a single structured edit " +
          'to their portfolio JSON. Only propose ONE edit per message — if the message describes ' +
          'multiple changes, pick the primary one and say so in the summary. Use "merge" to shallow-merge ' +
          'fields into an object section (profile, hero, skills), "append" to add exactly one new item to ' +
          'an array section, or "replace" to fully replace an array section\'s contents. Never invent facts ' +
          "not present in the message or the current data — if a required field isn't given, leave it as " +
          'an empty string rather than guessing.',
      },
      {
        role: 'user',
        content:
          `Current portfolio.json:\n${JSON.stringify(currentPortfolio, null, 2)}\n\n` +
          `Message to apply:\n${message}`,
      },
    ],
    tools: [
      {
        type: 'function',
        function: {
          name: 'propose_portfolio_edit',
          description: 'Propose a single structured edit to apply to portfolio.json',
          parameters: {
            type: 'object',
            properties: {
              section: { type: 'string', enum: SECTION_KEYS },
              mode: { type: 'string', enum: ['merge', 'append', 'replace'] },
              value: {
                type: ['object', 'array'],
                description:
                  'New data for the edit — an object of changed fields for "merge", a single item ' +
                  'object for "append", or the full new array/object for "replace".',
              },
              summary: {
                type: 'string',
                description: 'One sentence describing the change, shown back to the user as confirmation.',
              },
            },
            required: ['section', 'mode', 'value', 'summary'],
          },
        },
      },
    ],
    tool_choice: {
      type: 'function',
      function: { name: 'propose_portfolio_edit' },
    },
  });

  const toolCall = response.choices[0]?.message.tool_calls?.[0];
  if (!toolCall || toolCall.type !== 'function') {
    throw new Error('DeepSeek did not return a structured edit.');
  }
  return JSON.parse(toolCall.function.arguments) as ProposedEdit;
}
