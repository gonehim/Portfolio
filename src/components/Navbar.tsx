import { FaGithub, FaLinkedin } from 'react-icons/fa';
import logo from '../assets/Khat Nama.png';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-10">
      <a href={import.meta.env.BASE_URL} aria-label="Home" className="flex shrink-0 items-center">
        <img src={logo} width={64} height={64} alt="Irfan Rahim logo" className="h-14 w-14" />
      </a>

      <div className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-stone-400 sm:flex">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
        Open to new opportunities
      </div>

      <div className="flex items-center gap-5 text-xl text-stone-300">
        <a
          href="https://www.linkedin.com/in/irfan-rahim-zabidi/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Irfan Rahim on LinkedIn"
          className="transition-colors hover:text-white"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/gonehim"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Irfan Rahim on GitHub"
          className="transition-colors hover:text-white"
        >
          <FaGithub />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
