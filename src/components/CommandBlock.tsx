import { useCopyToClipboard } from '../hooks/useCopyToClipboard';

interface CommandBlockProps {
  cmd: string;
  note?: string;
}

export function CommandBlock({ cmd, note }: CommandBlockProps) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <div className="group relative bg-slate-900 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5">
        <code className="text-sm text-emerald-300 font-mono whitespace-pre-wrap break-all">{cmd}</code>
        <button
          onClick={() => copy(cmd)}
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
