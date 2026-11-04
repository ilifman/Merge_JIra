import { useState } from 'react';

// ============================================================
// DATA
// ============================================================

const STEPS = [
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

const QUICK_COMMANDS = [
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

// ============================================================
// COMPONENTS
// ============================================================

function Header() {
  return (
    <header className="bg-gradient-to-br from-orange-600 via-red-600 to-pink-700 text-white py-10 px-6 shadow-xl">
      <div className="max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur rounded-2xl mb-4 text-4xl">
          🔀
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">How to Create a Git Repository</h1>
        <p className="text-lg text-orange-100 max-w-2xl mx-auto">
          A step-by-step guide — from <code className="bg-white/15 px-1.5 py-0.5 rounded text-sm">git init</code> to your first push
        </p>
      </div>
    </header>
  );
}

function CommandBlock({ cmd, note }: { cmd: string; note?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="group relative bg-slate-900 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5">
        <code className="text-sm text-emerald-300 font-mono whitespace-pre-wrap break-all">{cmd}</code>
        <button
          onClick={handleCopy}
          className="ml-3 shrink-0 text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 transition-colors opacity-0 group-hover:opacity-100"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      {note && (
        <div className="px-4 pb-2.5 text-xs text-slate-500 font-mono">
          # {note}
        </div>
      )}
    </div>
  );
}

function StepCard({ step, isActive, onClick }: { step: typeof STEPS[0]; isActive: boolean; onClick: () => void }) {
  return (
    <div
      className={`rounded-2xl border-2 transition-all duration-300 overflow-hidden cursor-pointer ${
        isActive
          ? 'border-orange-400 bg-white shadow-xl shadow-orange-100'
          : 'border-slate-200 bg-white hover:border-orange-200 hover:shadow-md'
      }`}
      onClick={onClick}
    >
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-colors ${
            isActive ? 'bg-orange-100' : 'bg-slate-100'
          }`}>
            {step.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                isActive ? 'bg-orange-500 text-white' : 'bg-slate-200 text-slate-500'
              }`}>
                Step {step.id}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-800">{step.title}</h3>
            <p className="text-sm text-slate-500 mt-0.5">{step.subtitle}</p>
          </div>
        </div>

        {isActive && (
          <div className="mt-5 space-y-3 animate-in">
            {step.commands.map((c, idx) => (
              <div key={idx}>
                {step.commands.length > 1 && (
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
                    {c.platform}
                  </div>
                )}
                <CommandBlock cmd={c.cmd} note={c.note} />
              </div>
            ))}

            {step.verify && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="text-xs font-semibold text-slate-500 mb-2">✅ Verify it worked:</div>
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                  <code className="text-xs text-slate-700 font-mono">$ {step.verify}</code>
                  <pre className="text-xs text-slate-500 font-mono mt-1 whitespace-pre-wrap">{step.verifyOutput}</pre>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function QuickReference() {
  return (
    <section className="py-8">
      <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <span className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">⚡</span>
        Quick Reference
      </h2>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="divide-y divide-slate-100">
            {QUICK_COMMANDS.slice(0, 5).map((item) => (
              <div key={item.cmd} className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors">
                <span className="text-sm text-slate-600">{item.desc}</span>
                <code className="text-xs font-mono text-orange-600 bg-orange-50 px-2 py-0.5 rounded">{item.cmd}</code>
              </div>
            ))}
          </div>
          <div className="divide-y divide-slate-100">
            {QUICK_COMMANDS.slice(5).map((item) => (
              <div key={item.cmd} className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors">
                <span className="text-sm text-slate-600">{item.desc}</span>
                <code className="text-xs font-mono text-orange-600 bg-orange-50 px-2 py-0.5 rounded">{item.cmd}</code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TLDRSection() {
  const [copied, setCopied] = useState(false);
  const fullScript = `# TL;DR — Create a Git repository in 5 commands
mkdir my-project && cd my-project
git init
echo "# My Project" > README.md
git add .
git commit -m "Initial commit"

# Then create repo on GitHub and push:
git remote add origin https://github.com/YOU/my-project.git
git branch -M main
git push -u origin main`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-8">
      <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600">⏱️</span>
        TL;DR — Copy & Paste
      </h2>
      <div className="relative bg-slate-900 rounded-xl border border-slate-700 overflow-hidden shadow-lg">
        <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs text-slate-400 ml-2 font-mono">terminal</span>
          </div>
          <button
            onClick={handleCopy}
            className="text-xs text-slate-400 hover:text-white px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 transition-colors"
          >
            {copied ? '✓ Copied!' : '📋 Copy all'}
          </button>
        </div>
        <pre className="p-5 text-sm text-slate-300 font-mono overflow-x-auto leading-relaxed">
          {fullScript}
        </pre>
      </div>
    </section>
  );
}

function DiagramSection() {
  return (
    <section className="py-8">
      <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">🗺️</span>
        How It All Connects
      </h2>
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          {/* Local */}
          <div className="text-center">
            <div className="w-24 h-24 mx-auto bg-blue-50 border-2 border-blue-200 rounded-2xl flex flex-col items-center justify-center">
              <span className="text-3xl">💻</span>
              <span className="text-xs font-bold text-blue-700 mt-1">Local</span>
            </div>
            <div className="mt-2 text-xs text-slate-500 space-y-0.5">
              <div><code className="bg-slate-100 px-1 rounded">.git/</code></div>
              <div><code className="bg-slate-100 px-1 rounded">Working Dir</code></div>
              <div><code className="bg-slate-100 px-1 rounded">Staging Area</code></div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex flex-col items-center gap-1">
            <div className="text-orange-400 text-2xl hidden md:block">⟷</div>
            <div className="text-orange-400 text-2xl md:hidden">⟳</div>
            <div className="text-xs text-slate-500 text-center">
              <div><code className="bg-orange-50 text-orange-600 px-1 rounded">git push</code></div>
              <div><code className="bg-orange-50 text-orange-600 px-1 rounded">git pull</code></div>
            </div>
          </div>

          {/* Remote */}
          <div className="text-center">
            <div className="w-24 h-24 mx-auto bg-emerald-50 border-2 border-emerald-200 rounded-2xl flex flex-col items-center justify-center">
              <span className="text-3xl">☁️</span>
              <span className="text-xs font-bold text-emerald-700 mt-1">Remote</span>
            </div>
            <div className="mt-2 text-xs text-slate-500 space-y-0.5">
              <div>GitHub / GitLab</div>
              <div>Bitbucket</div>
              <div>Any server</div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-sm font-semibold text-blue-800">1. Working Directory</div>
              <div className="text-xs text-blue-600 mt-1">Your actual files on disk</div>
            </div>
            <div className="bg-amber-50 rounded-lg p-3">
              <div className="text-sm font-semibold text-amber-800">2. Staging Area</div>
              <div className="text-xs text-amber-600 mt-1"><code>git add</code> prepares changes</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <div className="text-sm font-semibold text-purple-800">3. Repository</div>
              <div className="text-xs text-purple-600 mt-1"><code>git commit</code> saves snapshot</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-6 px-6 bg-slate-50 border-t border-slate-200 mt-8">
      <div className="max-w-5xl mx-auto text-center text-sm text-slate-500">
        Git Repository Guide • Works with GitHub, GitLab, Bitbucket, and any Git-compatible hosting
      </div>
    </footer>
  );
}

// ============================================================
// MAIN APP
// ============================================================

export default function App() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6">
        <TLDRSection />
        <DiagramSection />

        {/* Steps */}
        <section className="py-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">📖</span>
            Step-by-Step Guide
            <span className="text-sm font-normal text-slate-400 ml-2">— click to expand</span>
          </h2>
          <div className="space-y-3">
            {STEPS.map((step) => (
              <StepCard
                key={step.id}
                step={step}
                isActive={activeStep === step.id}
                onClick={() => setActiveStep(activeStep === step.id ? 0 : step.id)}
              />
            ))}
          </div>
        </section>

        <QuickReference />

        {/* Tips */}
        <section className="py-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600">💡</span>
            Tips & Best Practices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Use .gitignore', desc: 'Add node_modules/, .env, dist/, *.log to avoid tracking unnecessary files', icon: '📄' },
              { title: 'Write clear commit messages', desc: 'Use imperative mood: "Add feature" not "Added feature". Keep first line under 50 chars.', icon: '✍️' },
              { title: 'Commit often, push regularly', desc: 'Small, focused commits are easier to review and revert. Push at least daily.', icon: '🔄' },
              { title: 'Use branches for features', desc: 'Never commit directly to main. Create a branch, merge via pull request.', icon: '🌿' },
              { title: 'Never commit secrets', desc: 'API keys, passwords, tokens — use .env files and add them to .gitignore', icon: '🔐' },
              { title: 'Pull before you push', desc: 'Always git pull before pushing to avoid merge conflicts with teammates.', icon: '⬇️' },
            ].map((tip) => (
              <div key={tip.title} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <span className="text-xl shrink-0">{tip.icon}</span>
                  <div>
                    <h3 className="font-semibold text-slate-800 text-sm">{tip.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{tip.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
