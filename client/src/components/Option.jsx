import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setRole } from "../redux/roleSlice";

/* eslint-disable react/prop-types */
const Option = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const roleChanging = (role) => {
        localStorage.setItem('role', role);
        dispatch(setRole(role))
        navigate('/signup')
    }
  return (
    <div className='flex h-screen md:gap-8 gap-2 justify-center items-center flex-wrap'>
        <div onClick={()=>roleChanging("recruiter")} className=' text-center text-white w-40 hover:bg-gray-800 cursor-pointer text-lg font-bold h-40 border rounded-md flex justify-center items-center'>
            Sign Up as Recruiter
        </div>
        <div onClick={()=>roleChanging("creator")} className='w-40 h-40 text-center text-white hover:bg-gray-800 border cursor-pointer text-lg font-bold rounded-md flex justify-center items-center'>
            Sign Up as 
            <br/>Creator
        </div>
        <div onClick={()=>roleChanging("candidate")} className='w-40 h-40 text-center text-white hover:bg-gray-800 border cursor-pointer text-lg font-bold rounded-md flex justify-center items-center'>
            Sign Up as Candidate
        </div>
    </div>
  )
}

export default Option;