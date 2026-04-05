import { RiReactjsLine } from 'react-icons/ri';
import { BiLogoPostgresql } from 'react-icons/bi';
import { SiMongodb, SiPython, SiCplusplus } from 'react-icons/si';
import type { IconType } from 'react-icons';

interface Technology {
  icon: IconType;
  label: string;
  className: string;
}

const TECHNOLOGIES: Technology[] = [
  { icon: SiPython,        label: 'Python',     className: 'text-yellow-500' },
  { icon: SiCplusplus,     label: 'C++',        className: 'text-blue-600'   },
  { icon: RiReactjsLine,   label: 'React',      className: 'text-cyan-400'   },
  { icon: BiLogoPostgresql,label: 'PostgreSQL',  className: 'text-sky-700'    },
  { icon: SiMongodb,       label: 'MongoDB',    className: 'text-green-500'  },
];

const Technologies = () => {
  return (
    <section className="pb-24" aria-labelledby="technologies-heading">
      <h2 id="technologies-heading" className="my-20 text-center text-4xl">
        Technologies
      </h2>
      <ul className="flex flex-wrap items-center justify-center gap-4" role="list">
        {TECHNOLOGIES.map(({ icon: Icon, label, className }) => (
          <li key={label} className="p-4">
            <Icon className={`text-7xl ${className}`} aria-label={label} title={label} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Technologies;
