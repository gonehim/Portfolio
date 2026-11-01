import { TbCertificate } from 'react-icons/tb';
import { CERTIFICATES } from '../constants';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const Certificates = () => {
  return (
    <section id="certificates" className="py-24" aria-labelledby="certificates-heading">
      <h2 id="certificates-heading" className="sr-only">
        Certificates
      </h2>
      <SectionHeading
        index="02"
        label="Certificates"
        title="Credentials along the way."
        description={`${CERTIFICATES.length} certifications across cloud, data, programming, and engineering.`}
      />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
        {CERTIFICATES.map((certificate, index) => (
          <Reveal
            as="li"
            key={certificate.name}
            delayMs={index * 60}
            className="flex items-start gap-4 rounded-lg border border-stone-800 bg-stone-950/60 p-5"
          >
            <TbCertificate className="mt-0.5 shrink-0 text-2xl text-emerald-400/80" aria-hidden="true" />
            <div>
              <h3 className="text-sm text-stone-100 sm:text-base">{certificate.name}</h3>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-stone-500">
                {certificate.date}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
};

export default Certificates;
