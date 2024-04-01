import { motion } from "framer-motion"

export const Navbar = () => {
    return (
        <div className="sticky top-0 z-10 border-b border-gray-700 backdrop-blur-md">
            <nav className="w-full h-12 flex justify-center items-center">
                <div className="flex">
                    <div className="flex justify-between items-center">
                        
                            <div className="flex justify-between items-center text-lg text-white mr-8">
                                <a href="#">
                                    <svg className="h-8 w-8 "  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />  <polyline points="7.5 4.21 12 6.81 16.5 4.21" />  <polyline points="7.5 19.79 7.5 14.6 3 12" />  <polyline points="21 12 16.5 14.6 16.5 19.79" />  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />  <line x1="12" y1="22.08" x2="12" y2="12" /></svg>
        
                                </a>
                            </div>
                            
    
                        <div className="flex font-m items-center hidden md:flex space-x-12 items-center text-white">
                            <a href="#">Features</a>
                            <a href="#">Method</a>
                            <a href="#">Customers</a>
                            <a href="#">Changelog</a>
                            <a href="#">Pricing</a>
                            <a href="#">Company</a>
                            <a href="#">Contact</a>
                        </div>
                        <div className="md:flex space-x-8 items-center">
                            <a href="#" className="text-white ml-8">Log in</a>
                            <button className="bg-transparent font-m bg-white text-gray-800  py-1 px-3  rounded-full">Sign Up
                                
                            </button>
                        </div>
                        <div>
                            
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}