import { SiPython, SiReact, SiTelegram, SiTypescript, SiGithubactions, SiSelenium } from 'react-icons/si';
import { VscAzure, VscAzureDevops } from 'react-icons/vsc';
import {
  TbAppWindow,
  TbBolt,
  TbBrain,
  TbChartBar,
  TbCode,
  TbDatabase,
  TbFileTypeXml,
  TbFolders,
  TbSql,
  TbTruckDelivery,
} from 'react-icons/tb';
import type { IconType } from 'react-icons';
import { PROJECTS } from '../constants';

interface Technology {
  icon: IconType;
  label: string;
  // Names this technology goes by in the projects' technology lists.
  aliases: string[];
}

const CANDIDATES: Technology[] = [
  { icon: TbAppWindow, label: 'Power Apps', aliases: ['Power Apps'] },
  { icon: TbBolt, label: 'Power Automate', aliases: ['Power Automate', 'Power Automate Desktop'] },
  { icon: TbFolders, label: 'SharePoint', aliases: ['SharePoint'] },
  {
    icon: TbTruckDelivery,
    label: 'CargoWise One',
    aliases: ['CargoWise One', 'CargoWise XML API', 'CargoWise eAdaptor', 'eAdaptor', 'Universal API'],
  },
  { icon: SiPython, label: 'Python', aliases: ['Python'] },
  { icon: TbDatabase, label: 'Dataverse', aliases: ['Dataverse'] },
  { icon: TbSql, label: 'SQL', aliases: ['SQL', 'SQLite'] },
  {
    icon: VscAzure,
    label: 'Azure',
    aliases: ['Azure AI', 'Azure Functions', 'Azure Storage', 'API Management', 'Azure AI Foundry', 'Azure CLI'],
  },
  { icon: TbFileTypeXml, label: 'XML', aliases: ['XML'] },
  { icon: VscAzureDevops, label: 'Azure DevOps', aliases: ['Azure DevOps'] },
  { icon: TbBrain, label: 'AI Builder', aliases: ['AI Builder'] },
  { icon: TbChartBar, label: 'Power BI', aliases: ['Power BI', 'Microsoft Power BI'] },
  { icon: TbCode, label: 'Mendix', aliases: ['Mendix'] },
  { icon: SiReact, label: 'React', aliases: ['React'] },
  { icon: SiTelegram, label: 'Telegram Bot API', aliases: ['Telegram Bot API'] },
  { icon: SiTypescript, label: 'TypeScript', aliases: ['TypeScript'] },
  { icon: SiGithubactions, label: 'GitHub Actions', aliases: ['GitHub Actions'] },
  { icon: SiSelenium, label: 'Selenium', aliases: ['Selenium'] },
];

// A technology counts as "core" once it appears in at least this many projects.
const CORE_MIN_PROJECTS = 2;

export const TECHNOLOGIES = CANDIDATES.map((tech) => ({
  ...tech,
  projectCount: PROJECTS.filter((project) =>
    project.technologies.some((name) => tech.aliases.includes(name))
  ).length,
}))
  .filter(({ projectCount }) => projectCount >= CORE_MIN_PROJECTS)
  .sort((a, b) => b.projectCount - a.projectCount);

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
            {trackItems.map(({ icon: Icon, label, projectCount }, index) => (
              <div
                key={`${label}-${index}`}
                className="flex items-center gap-3 text-stone-400"
                aria-hidden={index >= TECHNOLOGIES.length}
              >
                <Icon className="text-2xl" />
                <span className="font-mono text-sm uppercase tracking-wider">{label}</span>
                <span
                  className="font-mono text-[10px] text-stone-600"
                  title={`Used in ${projectCount} projects`}
                >
                  ×{projectCount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;
