import { useState } from 'react';
import { PROJECTS } from '../constants';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const Projects = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="work" className="py-24" aria-labelledby="projects-heading">
      <h2 id="projects-heading" className="sr-only">
        Projects
      </h2>
      <SectionHeading
        index="01"
        label="Selected Work"
        title="Projects with something to show."
        description={`${PROJECTS.length} projects spanning web apps, data tooling, and automation.`}
      />

      <ul className="divide-y divide-stone-900 border-t border-stone-900" role="list">
        {PROJECTS.map((project, index) => {
          const isOpen = openIndex === index;
          return (
            <Reveal as="li" key={project.title} delayMs={index * 60}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-6 py-6 text-left transition-colors hover:bg-stone-950"
              >
                <span className="font-mono text-sm text-stone-600">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <h3 className="text-lg text-stone-100 sm:text-xl">{project.title}</h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-stone-500">
                    {project.technologies.join(' / ')}
                  </p>
                </div>
                <span
                  className={`font-mono text-xl text-stone-500 transition-transform duration-300 ${
                    isOpen ? 'rotate-45' : ''
                  }`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>

              {isOpen && (
                <div className="grid gap-6 pb-8 sm:grid-cols-[200px_1fr]">
                  <img
                    src={project.image}
                    width={200}
                    height={200}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="h-40 w-full rounded-lg border border-stone-800 object-cover sm:h-full"
                  />
                  <p className="text-sm leading-relaxed text-stone-400">{project.description}</p>
                </div>
              )}
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
};

export default Projects;
