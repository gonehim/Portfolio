import { PortfolioSchema } from './schema.ts';

const GITHUB_API = 'https://api.github.com';

// Hardcoded, never derived from caller input. GH_TOKEN has Contents: Read and
// write on the whole repo (GitHub fine-grained PATs can't scope to one file),
// so this constant is the only thing stopping a bug elsewhere from writing
// outside this file.
const FILE_PATH = 'data/portfolio.json';

export async function fetchPortfolioJson(repo: string, token: string) {
  const res = await fetch(`${GITHUB_API}/repos/${repo}/contents/${FILE_PATH}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${FILE_PATH}: ${res.status} ${await res.text()}`);
  }
  const json = (await res.json()) as { content: string; sha: string };
  const content = Buffer.from(json.content, 'base64').toString('utf-8');
  return { content: JSON.parse(content), sha: json.sha };
}

export async function updatePortfolioJson(
  repo: string,
  token: string,
  newContent: unknown,
  sha: string,
  message: string,
) {
  // Re-validate here, independent of whatever the caller already checked —
  // this function is the last gate before a write lands with repo-wide
  // credentials, so it must not trust its input.
  const validated = PortfolioSchema.parse(newContent);
  const body = `${JSON.stringify(validated, null, 2)}\n`;
  const res = await fetch(`${GITHUB_API}/repos/${repo}/contents/${FILE_PATH}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      content: Buffer.from(body, 'utf-8').toString('base64'),
      sha,
    }),
  });
  if (!res.ok) {
    throw new Error(`Failed to update ${FILE_PATH}: ${res.status} ${await res.text()}`);
  }
  return res.json();
}
