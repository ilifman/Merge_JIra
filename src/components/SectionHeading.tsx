interface SectionHeadingProps {
  icon: string;
  iconClass?: string;
  title: string;
  trailing?: React.ReactNode;
}

/** Consistent heading used by every page section. */
export function SectionHeading({ icon, iconClass = 'bg-slate-100', title, trailing }: SectionHeadingProps) {
  return (
    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
      <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconClass}`}>{icon}</span>
      {title}
      {trailing}
    </h2>
  );
}
