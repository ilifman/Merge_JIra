import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { SectionHeading } from './SectionHeading';

const FULL_SCRIPT = `# TL;DR — Create a Git repository in 5 commands
mkdir my-project && cd my-project
git init
echo "# My Project" > README.md
git add .
git commit -m "Initial commit"

# Then create repo on GitHub and push:
git remote add origin https://github.com/YOU/my-project.git
git branch -M main
git push -u origin main`;

const TERMINAL_DOTS = ['bg-red-500', 'bg-yellow-500', 'bg-green-500'];

export function TLDRSection() {
  const { copied, copy } = useCopyToClipboard(2000);

  return (
    <section className="py-8">
      <SectionHeading icon="⏱️" iconClass="bg-green-100 text-green-600" title="TL;DR — Copy & Paste" />
      <div className="relative bg-slate-900 rounded-xl border border-slate-700 overflow-hidden shadow-lg">
        <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
          <div className="flex items-center gap-2">
            {TERMINAL_DOTS.map((dot) => (
              <div key={dot} className={`w-3 h-3 rounded-full ${dot}`}></div>
            ))}
            <span className="text-xs text-slate-400 ml-2 font-mono">terminal</span>
          </div>
          <button
            onClick={() => copy(FULL_SCRIPT)}
            className="text-xs text-slate-400 hover:text-white px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 transition-colors"
          >
            {copied ? '✓ Copied!' : '📋 Copy all'}
          </button>
        </div>
        <pre className="p-5 text-sm text-slate-300 font-mono overflow-x-auto leading-relaxed">
          {FULL_SCRIPT}
        </pre>
      </div>
    </section>
  );
}
