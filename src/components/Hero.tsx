import profilePic from '../assets/ProfilePic.jpg'
import { HERO_CONTENT } from '../constants'

const Hero = () => {
    return (
        <div className="pb-4 lg:mb-36">
            <div className="flex flex-wrap lg:flex-row-reverse lg:items-center">
                <div className="w-full lg:w-1/2">
                    <div className="flex justify-center lg:p-8">
                        <img src={profilePic} alt="Irfan Rahim" className="w-72 h-80 object-cover border border-stone-900 rounded-3xl"/>
                    </div>
                </div>
                <div className="w-full lg:w-1/2">
                    <div className="flex flex-col items-center lg:items-start lg:mt-0 mt-10">
                        <h2 className="pb-2 text-4xl tracking-tighter lg:text-8xl">Irfan Rahim
                        </h2>
                        <span className="bg-gradient-to-r from-stone-300 to-stone-600 bg-clip-text text-3xl tracking-tight text-transparent">Software Engineer
                        </span>
                        <p className="my-2 max-w-2xl py-6 text-xl leading-relaxed tracking-tighter">{HERO_CONTENT}
                        </p>
                        <a href="/Irfan_Rahim_Resume_Word.pdf" 
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="bg-white rounded-full p-4 text-sm text-stone-800 mb-10 hover:bg-stone-100 transition">
                            Download Resume
                        </a>
                    </div>
                </div>
            </div> 
            

        </div>
    )
}

export default Hero;