/* eslint-disable react/prop-types */
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import  {app}  from "../firebase/firebaseConfig";
import axios from "axios";
import {
    IconBrandGoogle,
  } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setRole } from "../redux/roleSlice";
import { setAuthenticate } from "../redux/isAuthenticated";
const GoogleAuth = ({role}) => {
    const auth = getAuth(app);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async (e) => {
        e.preventDefault();
        dispatch(signInStart());
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({prompt: 'select_account'});
        try{
            const formResult = await signInWithPopup(auth, provider);
            const res = await axios.post(`/auth/google`, {
                username:formResult.user.displayName,
                email:formResult.user.email,
                googlePhotUrl:formResult.user.photoURL,
                role:role.role
            });
            const data = res.data;
            // console.log("response is", data)
            if(res.status === 200){
                dispatch(signInSuccess(data));
                toast.success(data.msg, {
                    className: 'bg-slate-900 text-white'
                });
                localStorage.setItem('role', data.role);
                dispatch(setRole(data.role))
                localStorage.setItem('token', data.token);
                dispatch(setAuthenticate(true))
                if(localStorage.getItem('role')==='creator'){
                    navigate('/edit-creator')
                }
                
                else if(localStorage.getItem('role')==='candidate'){
                    navigate('/edit-candidate')
                  }
                  else{
                    navigate('/edit-recruiter')
                  }
            }
        }catch(err){
            dispatch(signInFailure(err.response?.data));
            toast.error("Google is not responding", {
                className: 'bg-slate-900 text-white'
            });
            console.log(err);
        }
    }    

    return (
    <button onClick={handleGoogleClick} className="w-full flex justify-center items-center gap-4 text-white py-1 rounded-md">
        <IconBrandGoogle/>
        Continue with Google
    </button>
  )
}

export default GoogleAuth