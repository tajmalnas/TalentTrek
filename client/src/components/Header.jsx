import { useNavigate } from "react-router-dom"

export const Header = () => {
    
    const navigate = useNavigate();

    return(
        <div className="flex flex-col justify-center items-center mt-16">
            <div className="mt-8 text-center text-5xl font-medium tracking-tight text-transparent md:text-6xl max-w-3xl">
                <span className="text-white  leading-6">Educate. Innovate. Elevate. </span><span className="bg-gradient-to-br from-white to-slate-500 py-4 bg-clip-text">Welcome to Talent Trek!</span>
            </div>
                <p className="text-slate-300 mt-8 text-[21px] max-w-2xl text-center">Transform your career aspirations into reality with tailored resources</p>
                <p className="text-slate-300 text-xl text-center">and guidance, empowering you to achieve your professional goals.</p>
            <button onClick={() => navigate('/signup')} className="bg-transparent font-m bg-white text-gray-800  py-1 px-3 rounded-full mt-12 w-32 h-12 font-medium">
                Get started {">"}
            </button>
        </div>
    )
}