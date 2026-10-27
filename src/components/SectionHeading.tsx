import Reveal from './Reveal';

interface SectionHeadingProps {
  index: string;
  label: string;
  title: string;
  description?: string;
}

const SectionHeading = ({ index, label, title, description }: SectionHeadingProps) => (
  <Reveal className="mb-16">
    <span className="font-mono text-xs uppercase tracking-[0.25em] text-stone-500">
      {index} / {label}
    </span>
    <h2 className="mt-4 max-w-xl text-3xl leading-tight tracking-tight text-stone-100 sm:text-4xl">
      {title}
    </h2>
    {description && (
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-stone-400">{description}</p>
    )}
  </Reveal>
);

export default SectionHeading;
