import profilePic from '../assets/ProfilePic.jpg';
import { HERO_CONTENT } from '../constants';

const Hero = () => {
  return (
    <section className="pb-4 lg:mb-36" aria-label="Introduction">
      <div className="flex flex-wrap lg:flex-row-reverse lg:items-center">
        <div className="w-full lg:w-1/2">
          <div className="flex justify-center lg:p-8">
            <img
              src={profilePic}
              alt="Irfan Rahim Zabidi"
              width={288}
              height={320}
              loading="eager"
              fetchPriority="high"
              className="h-80 w-72 rounded-3xl border border-stone-900 object-cover"
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="mt-10 flex flex-col items-center lg:mt-0 lg:items-start">
            <h1 className="pb-2 text-4xl tracking-tighter lg:text-8xl">Irfan Rahim</h1>
            <span className="bg-gradient-to-r from-stone-300 to-stone-600 bg-clip-text text-3xl tracking-tight text-transparent">
              Software Engineer
            </span>
            <p className="my-2 max-w-2xl py-6 text-xl leading-relaxed tracking-tighter">
              {HERO_CONTENT}
            </p>
            <a
              href="/Irfan_Rahim_Resume_Word.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="mb-10 rounded-full bg-white p-4 text-sm text-stone-800 transition hover:bg-stone-100"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
