import { RiReactjsLine } from 'react-icons/ri';
import { BiLogoPostgresql } from 'react-icons/bi';
import { SiMongodb, SiPython, SiCplusplus } from 'react-icons/si';
import type { IconType } from 'react-icons';

interface Technology {
  icon: IconType;
  label: string;
}

export const TECHNOLOGIES: Technology[] = [
  { icon: SiPython, label: 'Python' },
  { icon: SiCplusplus, label: 'C++' },
  { icon: RiReactjsLine, label: 'React' },
  { icon: BiLogoPostgresql, label: 'PostgreSQL' },
  { icon: SiMongodb, label: 'MongoDB' },
];

const Technologies = () => {
  // Duplicated once so the marquee can loop seamlessly at -50% translateX.
  const trackItems = [...TECHNOLOGIES, ...TECHNOLOGIES];

  return (
    <section className="border-y border-stone-900 py-10" aria-labelledby="technologies-heading">
      <h2 id="technologies-heading" className="sr-only">
        Technologies
      </h2>
      <div className="flex items-center gap-8">
        <span className="shrink-0 font-mono text-xs uppercase tracking-[0.25em] text-stone-500">
          Built with
        </span>
        <div className="relative flex-1 overflow-hidden">
          <div className="flex w-max animate-ticker items-center gap-14">
            {trackItems.map(({ icon: Icon, label }, index) => (
              <div
                key={`${label}-${index}`}
                className="flex items-center gap-3 text-stone-400"
                aria-hidden={index >= TECHNOLOGIES.length}
              >
                <Icon className="text-2xl" />
                <span className="font-mono text-sm uppercase tracking-wider">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;
