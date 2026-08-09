// Use .webp for better compression over .png
import project1 from '../assets/projects/project-1.webp';
import project2 from '../assets/projects/project-2.webp';
import project3 from '../assets/projects/project-3.webp';
import portfolioData from '../../data/portfolio.json';

const imageMap: Record<string, string> = {
  'project-1.webp': project1,
  'project-2.webp': project2,
  'project-3.webp': project3,
};

export const HERO_CONTENT = portfolioData.hero.content;

export const PROJECTS = portfolioData.siteProjects.map((project) => ({
  ...project,
  image: imageMap[project.image],
}));
