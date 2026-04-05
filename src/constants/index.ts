// Use .webp for better compression over .png
import project1 from '../assets/projects/project-1.webp';
import project2 from '../assets/projects/project-2.webp';
import project3 from '../assets/projects/project-3.webp';

export const HERO_CONTENT = `I'm Irfan Rahim Zabidi, a dedicated Software Engineer at FCS Solutions. I specialise in building and maintaining backend systems for web applications using Python, with a strong focus on performance, scalability, and clean architecture. My work also involves writing efficient SQL queries and managing databases through both raw SQL and ORM frameworks.

I hold a Bachelor's degree in Mechatronics Engineering from the International Islamic University Malaysia (IIUM), and I'm passionate about creating impactful, tech-driven solutions that solve real-world problems.`;

export const PROJECTS = [
  {
    title: 'Portfolio Website',
    image: project1,
    description:
      'A personal portfolio website showcasing projects, skills, and contact information.',
    technologies: ['HTML', 'CSS', 'React', 'TypeScript'],
  },
  {
    title: 'Anime Search App',
    image: project2,
    description:
      'A modern React application that allows users to search and discover anime titles using the Jikan API. Built with React, TypeScript, and Tailwind CSS.',
    technologies: ['HTML', 'CSS', 'React', 'TypeScript'],
  },
  {
    title: 'Projects Progress Dashboard',
    image: project3,
    description:
      'An application for managing tasks and projects, with features such as task creation, assignment, and progress tracking.',
    technologies: ['Excel', 'Power Apps', 'Microsoft Power BI'],
  },
];
