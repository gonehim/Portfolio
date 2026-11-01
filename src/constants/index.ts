import portfolioData from '../../data/portfolio.json';

export const PROFILE = portfolioData.profile;

export const HERO_CONTENT = portfolioData.hero.content;

export const PROJECTS = portfolioData.siteProjects;

// Newest first; dates are written like "August 2026".
export const CERTIFICATES = [...portfolioData.certificates].sort(
  (a, b) => Date.parse(`1 ${b.date}`) - Date.parse(`1 ${a.date}`)
);

export const CERTIFICATE_COUNT = CERTIFICATES.length;
