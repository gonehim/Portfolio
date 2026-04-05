import { FaGithub, FaLinkedin } from 'react-icons/fa';
import logo from '../assets/Khat Nama.png';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-16">
      <div className="flex shrink-0 items-center">
        <a href="/" aria-label="Home">
          <img src={logo} width={100} height={100} alt="Irfan Rahim logo" className="mx-2" />
        </a>
      </div>
      <div className="flex items-center gap-4 text-2xl">
        <a
          href="https://www.linkedin.com/in/irfan-rahim-zabidi/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Irfan Rahim on LinkedIn"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/gonehim"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Irfan Rahim on GitHub"
        >
          <FaGithub />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
