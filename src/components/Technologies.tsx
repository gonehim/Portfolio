import { RiReactjsLine } from "react-icons/ri";
import { BiLogoPostgresql } from "react-icons/bi";
import { SiMongodb, SiPython, SiCplusplus } from "react-icons/si";

const Technologies = () => {
  return (
    <div className="pb-24">
      <h2 className="my-20 text-center text-4xl">Technologies</h2>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <div className="p-4">
          <SiPython className="text-7xl text-yellow-500" />
        </div>
        <div className="p-4">
          <SiCplusplus className="text-7xl text-blue-600" />
        </div>
        <div className="p-4">
          <RiReactjsLine className="text-7xl text-cyan-400" />
        </div>
        <div className="p-4">
          <BiLogoPostgresql className="text-7xl text-sky-700" />
        </div>
        <div className="p-4">
          <SiMongodb className="text-7xl text-green-500" />
        </div>
      </div>
    </div>
  );
};

export default Technologies;
