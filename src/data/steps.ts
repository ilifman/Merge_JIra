import type { GuideStep } from '../types';

export const STEPS: GuideStep[] = [
  {
    id: 1,
    title: 'Install Git',
    subtitle: 'Make sure Git is installed on your system',
    icon: '📦',
    commands: [
      { platform: 'Windows', cmd: 'Download from git-scm.com and run installer', note: 'Use default settings during installation' },
      { platform: 'macOS', cmd: 'brew install git', note: 'Or install Xcode Command Line Tools' },
      { platform: 'Linux', cmd: 'sudo apt install git', note: 'Or: sudo dnf install git / sudo pacman -S git' },
    ],
    verify: 'git --version',
    verifyOutput: 'git version 2.43.0',
  },
  {
    id: 2,
    title: 'Configure Git',
    subtitle: 'Set your identity (one-time setup)',
    icon: '👤',
    commands: [
      { platform: 'All', cmd: 'git config --global user.name "Your Name"', note: 'Name shown in commits' },
      { platform: 'All', cmd: 'git config --global user.email "you@example.com"', note: 'Email linked to commits' },
      { platform: 'All', cmd: 'git config --global init.defaultBranch main', note: 'Default branch name' },
    ],
    verify: 'git config --list',
    verifyOutput: 'user.name=Your Name\nuser.email=you@example.com\ninit.defaultbranch=main',
  },
  {
    id: 3,
    title: 'Create Local Repository',
    subtitle: 'Initialize a new Git repo in your project folder',
    icon: '📁',
    commands: [
      { platform: 'All', cmd: 'mkdir my-project', note: 'Create project folder' },
      { platform: 'All', cmd: 'cd my-project', note: 'Navigate into it' },
      { platform: 'All', cmd: 'git init', note: 'Initialize empty Git repository' },
    ],
    verify: 'ls -la .git',
    verifyOutput: 'drwxr-xr-x  .git/\n(Hidden folder created — this is your repo)',
  },
  {
    id: 4,
    title: 'Create First Commit',
    subtitle: 'Add files and make your first commit',
    icon: '✏️',
    commands: [
      { platform: 'All', cmd: 'echo "# My Project" > README.md', note: 'Create a README file' },
      { platform: 'All', cmd: 'git add .', note: 'Stage all files (or: git add README.md)' },
      { platform: 'All', cmd: 'git commit -m "Initial commit"', note: 'Save snapshot with message' },
    ],
    verify: 'git log --oneline',
    verifyOutput: 'a1b2c3d Initial commit',
  },
  {
    id: 5,
    title: 'Create Remote Repository',
    subtitle: 'Create a repository on GitHub / GitLab / Bitbucket',
    icon: '☁️',
    commands: [
      { platform: 'GitHub CLI', cmd: 'gh repo create my-project --public --source=. --push', note: 'One-command setup (recommended)' },
      { platform: 'GitHub Web', cmd: '1. Go to github.com/new\n2. Name: my-project\n3. Public or Private\n4. Do NOT initialize with README\n5. Click "Create repository"', note: 'Copy the remote URL shown' },
      { platform: 'GitLab Web', cmd: '1. Go to gitlab.com/projects/new\n2. Project name: my-project\n3. Visibility: Public/Private\n4. Click "Create project"', note: 'Copy the remote URL shown' },
    ],
    verify: '',
    verifyOutput: '',
  },
  {
    id: 6,
    title: 'Connect & Push',
    subtitle: 'Link local repo to remote and push your code',
    icon: '🚀',
    commands: [
      { platform: 'All', cmd: 'git remote add origin https://github.com/username/my-project.git', note: 'Add remote (use YOUR URL)' },
      { platform: 'All', cmd: 'git branch -M main', note: 'Rename branch to main' },
      { platform: 'All', cmd: 'git push -u origin main', note: 'Push and set upstream tracking' },
    ],
    verify: 'git remote -v',
    verifyOutput: 'origin  https://github.com/username/my-project.git (fetch)\norigin  https://github.com/username/my-project.git (push)',
  },
];
