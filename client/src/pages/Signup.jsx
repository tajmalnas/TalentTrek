/* eslint-disable react/prop-types */
"use client";
import { Label } from "../components/AceComps/Label";
import { Input } from "../components/AceComps/Input";
import axios from "axios";


import clsx from "clsx"; // Import the entire clsx module

import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { validateForm } from "./validate";
import Option from "../components/Option";
import GoogleAuth from "../components/GoogleAuth";
import { useSelector } from "react-redux";

export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}

function SignupFormDemo() {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const role = useSelector((state)=>state.role)

  let errorMessage = "valid";
  
  const navigate = useNavigate()
  const navigateTo = (path) => {
    navigate(path);
  }


  const postData = async () => {
    await axios.post(`/auth/signup`, {
      username,
      email,
      password,
      role:role.role
    }).then(() => {
        toast.success("sign up succesfully", {
            className: 'bg-slate-900 text-white'
        });
      setLoading(false);
      navigateTo('/signin');
    }).catch((err) => {
      setLoading(false);
      toast.error("something went wrong",{
        className: 'bg-slate-900 text-white'
      });
      console.log(err.response);
    });
  }
  const submitForm = (e) => {
    e.preventDefault();
    setLoading(true);
    errorMessage = validateForm(username, email, password, confirmPassword);
    if (errorMessage !== "valid") {
      toast.error(errorMessage,{
        className:'bg-slate-900 text-white'
      });
      setLoading(false);
      return;
    }
    postData();
  }

  if(localStorage.getItem('role')==="" || localStorage.getItem('role')===null)  {
    return(
      <Option />
    )
  }


  // if(localStorage.getItem('role')!==""){
  //   navigateTo('/signin');
  // }

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Hiretainity
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to Hiretainity
      </p>

      <form className="my-8">
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">UserName</Label>
            <Input id="username" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="pawan" type="text" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="projectmayhem@fc.com" type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="••••••••" type="password" />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Confirm Password</Label>
          <Input id="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="••••••••" type="password" />
        </LabelInputContainer>

        {loading?<span>Loading...</span>:<button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          onClick={submitForm}
        >
          Sign up &rarr;
          <BottomGradient />
        </button>}

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
          >
            <GoogleAuth role={role}/>
            <BottomGradient />
          </button>
        </div>
        <div className="pt-4 text-white">
          Already have an account? <button onClick={()=>navigate('/signin')} className="border border-white rounded-md p-2">SignIn</button>
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

export default SignupFormDemo;