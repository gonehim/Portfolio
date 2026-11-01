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
        description={`${PROJECTS.length} projects spanning enterprise automation, AI, integration, and web.`}
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
                <div className="pb-8">
                  <p className="max-w-3xl text-sm leading-relaxed text-stone-400">{project.description}</p>

                  {project.workflow && project.workflow.length > 0 && (
                    <div className="mt-8">
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-stone-600">
                        Workflow
                      </p>
                      <ol className="mt-4 flex flex-col md:flex-row" aria-label={`${project.title} workflow`}>
                        {project.workflow.map((step, stepIndex) => (
                          <li key={step.label} className="flex flex-col items-center md:flex-1 md:flex-row">
                            <div className="w-full flex-1 self-stretch rounded-lg border border-stone-800 bg-stone-950/60 p-3">
                              <span className="font-mono text-[10px] text-emerald-400/80">
                                {String(stepIndex + 1).padStart(2, '0')}
                              </span>
                              <p className="mt-1 text-sm text-stone-200">{step.label}</p>
                              {step.tool && (
                                <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-stone-500">
                                  {step.tool}
                                </p>
                              )}
                            </div>
                            {stepIndex < project.workflow.length - 1 && (
                              <span className="px-2 py-1 font-mono text-stone-600" aria-hidden="true">
                                <span className="md:hidden">↓</span>
                                <span className="hidden md:inline">→</span>
                              </span>
                            )}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
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
