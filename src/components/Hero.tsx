import profilePic from '../assets/ProfilePic.jpg';
import { HERO_CONTENT, PROFILE, PROJECTS, CERTIFICATE_COUNT } from '../constants';
import { TECHNOLOGIES } from './Technologies';
import { useMagnetic } from '../hooks/useMagnetic';
import Reveal from './Reveal';

const nameParts = PROFILE.name.split(' ');
const givenNames = nameParts.slice(0, -1).join(' ');
const surname = nameParts[nameParts.length - 1];
const primaryRole = PROFILE.title.split('|')[0].trim();

const STATS = [
  { value: PROJECTS.length, label: 'Projects shipped' },
  { value: TECHNOLOGIES.length, label: 'Core technologies' },
  { value: CERTIFICATE_COUNT, label: 'Certifications' },
];

const Hero = () => {
  const exploreRef = useMagnetic<HTMLAnchorElement>();
  const resumeRef = useMagnetic<HTMLAnchorElement>();

  return (
    <section id="home" className="pb-24 pt-6 lg:pb-32" aria-label="Introduction">
      <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.25em] text-stone-500">
        <span>{primaryRole}</span>
        <span>{PROFILE.address}</span>
      </div>

      <div className="mt-10 flex flex-wrap gap-12 lg:flex-row-reverse lg:items-center">
        <div className="w-full lg:w-[42%]">
          <Reveal className="relative mx-auto max-w-sm lg:mx-0">
            <img
              src={profilePic}
              alt={PROFILE.name}
              width={288}
              height={320}
              loading="eager"
              fetchPriority="high"
              className="h-96 w-full rounded-2xl border border-stone-800 object-cover"
            />
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-lg border border-stone-800 bg-black/70 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-stone-400 backdrop-blur">
              <span>{primaryRole}</span>
              <span>{PROFILE.nationality}</span>
            </div>
          </Reveal>
        </div>

        <div className="w-full lg:w-[58%]">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-stone-500">
              Software Engineering · Backend Systems · Clean Architecture
            </p>
            <h1 className="mt-4 text-5xl uppercase leading-[0.95] tracking-tight text-stone-100 sm:text-6xl lg:text-7xl">
              {givenNames}
              <br />
              <em className="font-mono not-italic text-stone-500">{surname}</em>
            </h1>
          </Reveal>

          <Reveal delayMs={100}>
            <p className="mt-8 max-w-xl whitespace-pre-line text-base leading-relaxed text-stone-400">
              {HERO_CONTENT}
            </p>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-stone-500">
              {PROFILE.title}
            </p>
          </Reveal>

          <Reveal delayMs={200} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              ref={exploreRef}
              href="#work"
              className="transition-transform duration-200 ease-out rounded-full bg-white px-6 py-3 text-sm font-medium text-stone-900 hover:bg-stone-200"
            >
              Explore work ↘
            </a>
            <a
              ref={resumeRef}
              href={`${import.meta.env.BASE_URL}Irfan_Rahim_Resume.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="transition-transform duration-200 ease-out rounded-full border border-stone-700 px-6 py-3 text-sm font-medium text-stone-300 hover:border-stone-400 hover:text-white"
            >
              Download Resume ↗
            </a>
          </Reveal>
        </div>
      </div>

      <Reveal delayMs={300} className="mt-20 grid grid-cols-3 gap-8 border-t border-stone-900 pt-10">
        {STATS.map(({ value, label }) => (
          <div key={label}>
            <b className="font-mono text-3xl text-stone-100 sm:text-4xl">{value}</b>
            <span className="mt-2 block font-mono text-[10px] uppercase tracking-widest text-stone-500">
              {label}
            </span>
          </div>
        ))}
      </Reveal>
    </section>
  );
};

export default Hero;
