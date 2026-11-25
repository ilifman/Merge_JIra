import { QUICK_COMMANDS } from '../data/quickCommands';
import type { QuickCommand } from '../types';
import { SectionHeading } from './SectionHeading';

const HALF = Math.ceil(QUICK_COMMANDS.length / 2);

function CommandRow({ item }: { item: QuickCommand }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors">
      <span className="text-sm text-slate-600">{item.desc}</span>
      <code className="text-xs font-mono text-orange-600 bg-orange-50 px-2 py-0.5 rounded">{item.cmd}</code>
    </div>
  );
}

export function QuickReference() {
  const columns = [QUICK_COMMANDS.slice(0, HALF), QUICK_COMMANDS.slice(HALF)];

  return (
    <section className="py-8">
      <SectionHeading icon="⚡" title="Quick Reference" />
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {columns.map((column, idx) => (
            <div key={idx} className="divide-y divide-slate-100">
              {column.map((item) => (
                <CommandRow key={item.cmd} item={item} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
