import { useState } from 'react';
import { DiagramSection } from './components/DiagramSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { QuickReference } from './components/QuickReference';
import { SectionHeading } from './components/SectionHeading';
import { StepCard } from './components/StepCard';
import { TipsSection } from './components/TipsSection';
import { TLDRSection } from './components/TLDRSection';
import { STEPS } from './data/steps';

export default function App() {
  const [activeStep, setActiveStep] = useState<number>(1);

  const toggleStep = (id: number) =>
    setActiveStep((current) => (current === id ? 0 : id));

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6">
        <TLDRSection />
        <DiagramSection />

        {/* Steps */}
        <section className="py-8">
          <SectionHeading
            icon="📖"
            iconClass="bg-orange-100 text-orange-600"
            title="Step-by-Step Guide"
            trailing={<span className="text-sm font-normal text-slate-400 ml-2">— click to expand</span>}
          />
          <div className="space-y-3">
            {STEPS.map((step) => (
              <StepCard
                key={step.id}
                step={step}
                isActive={activeStep === step.id}
                onClick={() => toggleStep(step.id)}
              />
            ))}
          </div>
        </section>

        <QuickReference />
        <TipsSection />
      </main>
      <Footer />
    </div>
  );
}
