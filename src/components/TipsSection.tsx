import { TIPS } from '../data/tips';
import { SectionHeading } from './SectionHeading';

export function TipsSection() {
  return (
    <section className="py-8">
      <SectionHeading icon="💡" iconClass="bg-yellow-100 text-yellow-600" title="Tips & Best Practices" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TIPS.map((tip) => (
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
  );
}
