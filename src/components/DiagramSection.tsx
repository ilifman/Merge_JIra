import { SectionHeading } from './SectionHeading';

const LAYERS = [
  { name: '1. Working Directory', desc: 'Your actual files on disk', color: 'blue' },
  { name: '2. Staging Area', desc: 'git add prepares changes', color: 'amber' },
  { name: '3. Repository', desc: 'git commit saves snapshot', color: 'purple' },
] as const;

const LAYER_STYLES = {
  blue: { box: 'bg-blue-50', title: 'text-blue-800', desc: 'text-blue-600' },
  amber: { box: 'bg-amber-50', title: 'text-amber-800', desc: 'text-amber-600' },
  purple: { box: 'bg-purple-50', title: 'text-purple-800', desc: 'text-purple-600' },
};

export function DiagramSection() {
  return (
    <section className="py-8">
      <SectionHeading icon="🗺️" iconClass="bg-blue-100 text-blue-600" title="How It All Connects" />
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
            {LAYERS.map((layer) => {
              const style = LAYER_STYLES[layer.color];
              return (
                <div key={layer.name} className={`${style.box} rounded-lg p-3`}>
                  <div className={`text-sm font-semibold ${style.title}`}>{layer.name}</div>
                  <div className={`text-xs mt-1 ${style.desc}`}>{layer.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
