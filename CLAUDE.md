# CLAUDE.md — Portfolio CI/CD Automation Project

Context file for Claude Code. Read this before making changes.

## Objective

Build an end-to-end CI/CD automation workflow for a personal portfolio
website. Portfolio content is updated by sending a message to a Telegram bot —
no manual editing of the site. New content automatically triggers a build and
deploy, so the live site reflects updates within a few minutes.

This is a portfolio/learning project. The point is to *showcase* the automation
pipeline (Telegram bot → data store → CI/CD → deploy), so keep the moving parts
visible and well-documented rather than hidden behind managed magic.

## Architecture (decided)

Flow:

1. Authorized user sends portfolio info to a **Telegram bot**.
2. Bot **authenticates** the sender (user-ID whitelist) and **validates** input.
3. Bot writes the content to `data/portfolio.json` in the GitHub repo via the
   **GitHub REST Contents API** (using a fine-grained token).
4. That commit/push **triggers GitHub Actions**.
5. Actions **builds and tests** the site.
6. Actions **deploys** the built site to the host.
7. Live portfolio reflects the update. Git history = audit trail + rollback.

Key principle: the bot does NOT build the site. It only writes data. The commit
is the trigger; everything downstream is git-native.

## Environment / infrastructure

- I (the user) have a **VPS** and a **local repo** for the page.
- Site is currently plain static (HTML/CSS/JS). Framework is optional.

## Hosting decision (OPEN — pick one, recommended path marked)

**Recommended (hybrid — showcases CI/CD, uses the VPS):**
- **Bot** runs on the **VPS** as an always-on service (long-polling, so no
  public webhook endpoint needed). Managed with systemd or Docker.
- **Site** deploys to **GitHub Pages** via GitHub Actions. Keeps the pipeline
  the visible centerpiece and stays git-native.

**Alternative A (fully serverless bot):** bot as a serverless webhook
(Vercel / Cloudflare Workers / Deno Deploy), site on GitHub Pages. Use if the
VPS should stay idle.

**Alternative B (VPS-native everything):** bot + site both on the VPS; Actions
(or a git hook) deploys the built site to nginx on the VPS. More infra practice,
but GitHub Actions becomes less central to the demo.

> Default to the Recommended path unless the user says otherwise.

## Tech stack

- **Frontend:** HTML / CSS / JS (existing repo). Next.js only if the user wants
  framework practice — not required.
- **Bot:** Python with `python-telegram-bot` (or Node with `telegraf`).
- **Data store:** `data/portfolio.json` committed to the repo (structured JSON).
- **Version control:** Git + GitHub.
- **CI/CD:** GitHub Actions.
- **Hosting:** GitHub Pages (site) + VPS (bot) — see hosting decision above.

## Suggested repo structure

```
/
├── CLAUDE.md                 # this file
├── data/
│   └── portfolio.json        # the single source of truth for content
├── site/                     # the static site (reads portfolio.json)
│   ├── index.html
│   ├── style.css
│   └── app.js
├── bot/                      # Telegram bot service
│   ├── bot.py
│   ├── requirements.txt
│   └── .env.example          # documents required env vars (no secrets)
└── .github/
    └── workflows/
        └── deploy.yml        # build + deploy pipeline
```

## Security requirements

- Bot accepts commands only from a whitelist of Telegram user IDs, stored as an
  env var (`AUTHORIZED_USER_IDS`). Reject everyone else.
- GitHub token (`GH_TOKEN`) is fine-grained, scoped to this repo only, and lives
  ONLY in the bot's server environment. Never commit it.
- Validate all incoming content before writing (types, required fields, length
  limits) to avoid breaking the build with malformed data.
- Never commit secrets. `.env` is gitignored; `.env.example` documents keys.

## Non-functional requirements

- Reliable deploy with minimal downtime.
- Update visible on the live site within a few minutes of the Telegram message.
- Full update history for audit and rollback (comes free from Git:
  `git log` = audit, `git revert` = rollback).

## Environment variables (bot)

| Var | Purpose |
|-----|---------|
| `TELEGRAM_BOT_TOKEN` | Bot token from @BotFather |
| `AUTHORIZED_USER_IDS` | Comma-separated allowed Telegram user IDs |
| `GH_TOKEN` | Fine-grained GitHub PAT, scoped to this repo |
| `GH_REPO` | `owner/repo` target for the Contents API |

## Suggested build order (milestones)

1. **Static site reads JSON.** Refactor the existing page so its content is
   rendered from `data/portfolio.json` (fetch + template). Commit a sample JSON.
2. **GitHub Actions deploy.** Add `.github/workflows/deploy.yml` that builds and
   deploys `site/` to GitHub Pages on push to `main`. Verify a manual JSON edit
   → push → live update works end to end.
3. **Bot skeleton.** Telegram bot that echoes and enforces the user-ID
   whitelist. Run locally, then on the VPS.
4. **Validate + store.** Bot parses an update message into the portfolio schema,
   validates it, and writes `data/portfolio.json` via the GitHub Contents API.
5. **Full loop.** Telegram message → commit → Actions → live site. Confirm the
   few-minutes end-to-end timing.
6. **Harden.** systemd/Docker for the bot, error handling, restart on failure,
   basic logging, and a rollback command or documented `git revert` procedure.

## Open questions to resolve with the user

- Confirm hosting path (Recommended / A / B above).
- Confirm bot language (Python vs Node).
- Define the portfolio schema: what fields does an update contain
  (e.g. project title, description, link, tags, date)?
- Message format: free-form text the bot parses, or a guided
  command/conversation flow?
