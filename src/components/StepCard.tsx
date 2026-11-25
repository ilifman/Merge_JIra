import { CommandBlock } from './CommandBlock';
import type { GuideStep } from '../types';

interface StepCardProps {
  step: GuideStep;
  isActive: boolean;
  onClick: () => void;
}

export function StepCard({ step, isActive, onClick }: StepCardProps) {
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
