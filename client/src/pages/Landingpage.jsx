//import { LampDemo, LampContainer } from "../components/Lamp-header"
import { motion } from "framer-motion"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { GlassmorphismCard } from "../components/Glassmorphism-card"
import { LayoutGrid } from "../components/LayoutGrid"
import { ContainerScroll } from "../components/Container-Scroll-animation"
import { LampContainer } from "../components/Lamp-header"
import Spotlight from "../components/Spotlight"
import Subscription from "../components/Subscription/Subscription"

export const Landingpage = () => {
    return (
        <div className="bg-slate-950 w-full">
            <Navbar />
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="white"
            />
            <Header />
            
            <div className="flex flex-col items-center overflow-hidden m-0 p-0">
                <ContainerScroll/>
            </div>

            <div className="flex flex-col justify-center items-center">
                <div className="max-w-lg">
                    <div className="text-center text-5xl font-medium tracking-tight text-transparent md:text-5xl  max-w-2xl mb-0">
                        <span className="text-white leading-normal">Unleash the Potential </span><span className="text-white py-4 bg-clip-text">of Our Advanced Tools</span>
                    </div>
                    <div className="flex justify-center items-center flex-col">
                        <p className="text-slate-300 mt-8 text-2xl text-center">Modernize Your Hiring with Automated Email Outreach, Intelligent Candidate Selection, and Smooth Interview Coordination</p>
                    </div>
                </div>
            </div>
            <LayoutGrid />

            <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden z-0 mt-32">
                <LampContainer>
                    <motion.h1
                        initial={{ opacity: 0.5, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                        }}
                        className="w-full bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center tracking-tight text-transparent"
                    >
                        {/* <div className="bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-5xl font-medium tracking-tight text-transparent md:text-7xl">
                            Build lamps <br /> the right way
                        </div> */}
                        <div className="flex gap-6 justify-center m-0 p-0">
                            <div className="block max-w-sm p-6 bg-white/0 flex flex-col justify-center border border-gray-200 rounded-lg shadow dark:border-gray-700 backdrop-blur-xl">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">AI-Generated Interviews</h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">Provide a diverse set of questions based on the candidate's skillset and experience.</p>
                            </div>
                            <div className="block max-w-sm p-6 bg-white/0 flex flex-col justify-center border border-gray-200 rounded-lg shadow dark:border-gray-700 backdrop-blur-xl">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Inbuilt Compiler for Interviews</h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">Offer a real-time coding environment with syntax highlighting, auto-completion, and debugging features.</p>
                            </div>
                            <div className="block max-w-sm p-6 bg-white/0 flex flex-col justify-center border border-gray-200 rounded-lg shadow dark:border-gray-700 backdrop-blur-xl">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Smart Scheduling of Interviews</h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">Enable recruiters to upload candidate data via Excel files for quick interview scheduling.</p>
                            </div>
                        </div>
                    </motion.h1>
                </LampContainer>
            </div>
            <Subscription />
            <Footer />
        </div>
        
    )
}