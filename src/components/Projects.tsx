import { PROJECTS } from '../constants';

const Projects = () => {
  return (
    <section className="pb-4" aria-labelledby="projects-heading">
      <h2 id="projects-heading" className="my-20 text-center text-4xl">
        Projects
      </h2>
      <ul className="space-y-8" role="list">
        {PROJECTS.map((project) => (
          <li key={project.title} className="flex flex-wrap lg:justify-center">
            <div className="w-full lg:w-1/4">
              <img
                src={project.image}
                width={250}
                height={250}
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="mb-6 rounded"
              />
            </div>
            <article className="w-full max-w-xl lg:w-3/4">
              <h3 className="mb-2 text-2xl font-semibold">{project.title}</h3>
              <p className="mb-4 text-stone-400">{project.description}</p>
              <ul className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
                {project.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="rounded bg-stone-900 px-2 py-1 text-sm font-medium text-stone-300"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Projects;
