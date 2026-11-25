import type { QuickCommand } from '../types';

export const QUICK_COMMANDS: QuickCommand[] = [
  { desc: 'Check status', cmd: 'git status' },
  { desc: 'View log', cmd: 'git log --oneline --graph' },
  { desc: 'Stage specific file', cmd: 'git add filename.txt' },
  { desc: 'Stage all changes', cmd: 'git add .' },
  { desc: 'Commit changes', cmd: 'git commit -m "message"' },
  { desc: 'Push to remote', cmd: 'git push' },
  { desc: 'Pull from remote', cmd: 'git pull' },
  { desc: 'Create branch', cmd: 'git checkout -b feature-name' },
  { desc: 'Switch branch', cmd: 'git checkout main' },
  { desc: 'Merge branch', cmd: 'git merge feature-name' },
];
