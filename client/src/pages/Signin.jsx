/* eslint-disable react/prop-types */
"use client";
import React, { useState } from "react";
import { Label } from "../components/AceComps/Label";
import { Input } from "../components/AceComps/Input";
import clsx from "clsx"; // Import the entire clsx module
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router";
import {useSelector,useDispatch} from 'react-redux'
import axios from "axios";
import { toast } from "react-toastify";
import {signInStart,signInSuccess,signInFailure} from "../redux/user/userSlice"
import GoogleAuth from "../components/GoogleAuth";
import { setRole } from "../redux/roleSlice";
import { setAuthenticate } from "../redux/isAuthenticated";

export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}

function SignInFormDemo() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch();
  const {error} = useSelector(state => state.user)

  const navigate = useNavigate();
  const navigateTo = (path) => {
      navigate(path);
  }
  const role = useSelector((state)=>state.role)

  const postData = async () => {
  
    // setLoading(true); // Set loading to true when the request starts
    dispatch(signInStart());
    try {
      const res = await axios.post(`/auth/login`, {
        email,
        password,
      });
      dispatch(signInSuccess(res.data))
      dispatch(setRole(res.data.role))
      toast.success("user successfully logged in", {
        className: 'bg-slate-900 text-white'
      });
      console.log(res);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      dispatch(setAuthenticate(true))
      if(localStorage.getItem('role')==="creator"){
        navigateTo('/edit-creator')
      }
      else if(localStorage.getItem('role')==="candidate"){
        navigateTo('/edit-candidate')
      }
      else{
        navigateTo('/edit-recruiter')
      }
    } catch (err) {
      dispatch(signInFailure(err.response.data))
      toast.error(error.message,{
        className: 'bg-slate-900 text-white'
      });
      console.log(err.response);
    }
  }
  

  const submitForm = (e) => {
    e.preventDefault();
    // setLoading(true);
    dispatch(signInStart());
    if(!email || !password) {
      toast.error("All fields are required",{
        className:'bg-slate-900 text-white'
      });
      // setLoading(false);
      dispatch(signInFailure("all fields are required"));
      return;
    }
    if(email.indexOf('@') === -1 || email.indexOf('.') === -1) {
      toast.error("Invalid email",{
        className:'bg-slate-900 text-white'
      });
      // setLoading(false);
      dispatch(signInFailure("Invalid email"));
      return;
    }
    if(password.length < 8) {
      toast.error("Password must be at least 8 characters long",{
        className:'bg-slate-900 text-white'
      });
      // setLoading(false);
      dispatch(signInFailure("Password must be at least 8 characters long"));
      return;
    }
    postData()
    // setLoading(false);
  }


  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Hiretainity
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to Hiretainity
      </p>

      <form className="my-8">
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="projectmayhem@fc.com" type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="••••••••" type="password" />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          onClick={submitForm}
        >
          Sign in &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <GoogleAuth role={role}/>
            <BottomGradient />
          </button>
        </div>
        <div className="pt-4 text-white">
          Don{`'`}t have an account? <button onClick={()=>navigate('/signup')} className="border border-white rounded-md p-2">SignUp</button>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
    return (
      <>
        <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
      </>
    );
  };
  
  const LabelInputContainer = ({
    children,
    className,
  }) => {
    return (
      <div className={cn("flex flex-col space-y-2 w-full", className)}>
        {children}
      </div>
    );
  };
  
export default SignInFormDemo;

