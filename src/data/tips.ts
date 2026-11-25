import type { Tip } from '../types';

export const TIPS: Tip[] = [
  { title: 'Use .gitignore', desc: 'Add node_modules/, .env, dist/, *.log to avoid tracking unnecessary files', icon: '📄' },
  { title: 'Write clear commit messages', desc: 'Use imperative mood: "Add feature" not "Added feature". Keep first line under 50 chars.', icon: '✍️' },
  { title: 'Commit often, push regularly', desc: 'Small, focused commits are easier to review and revert. Push at least daily.', icon: '🔄' },
  { title: 'Use branches for features', desc: 'Never commit directly to main. Create a branch, merge via pull request.', icon: '🌿' },
  { title: 'Never commit secrets', desc: 'API keys, passwords, tokens — use .env files and add them to .gitignore', icon: '🔐' },
  { title: 'Pull before you push', desc: 'Always git pull before pushing to avoid merge conflicts with teammates.', icon: '⬇️' },
];
