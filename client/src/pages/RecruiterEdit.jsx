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
import Option from "../components/Option";
import { useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageDb } from "@/firebase/firebaseConfig";
import {v4} from 'uuid'

export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}

function RecruiterEdit() {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [image, setImage] = useState('')
  const [currentPosi, setCurrentPosi] = useState('')
  const [company, setCompany] = useState('')
  const [about, setAbout] = useState('')
  const [contact, setContact] = useState('')

  const [loading, setLoading] = useState(false)
  const user = useSelector((state)=>state.user)
  // const userId = user.currentUser.user._id
  console.log(user)
  
  const navigate = useNavigate()

  const submitForm = async(e) =>{
    e.preventDefault();
    if(firstName==="" || lastName==="" || company==="" || currentPosi==="" || about==="" || contact===""){
      toast.error("Please fill all the fields",{
        className: 'bg-slate-900 text-white'
      });
      return
    }
    setLoading(true);
    await axios.post('/recruiter/update-profile', {
      token:localStorage.getItem('token'),
      firstName,
      lastName,
      image,
      company,
      currentPosi,
      about,
      contact
    }).then((res) => {
      console.log("response",res)
        toast.success("Profile updated succesfully", {
            className: 'bg-slate-900 text-white'
        });
      setLoading(false);
      navigate('/edit-recruiter');
    }).catch((err) => {
      setLoading(false);
      toast.error("something went wrong",{
        className: 'bg-slate-900 text-white'
      });
      console.log(err.response);
    });
  }

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if(selectedFile){
      const imgref = ref(imageDb,`files/${v4()}`)
      uploadBytes(imgref,selectedFile).then((value)=>{
        console.log("image uploaded",value)
        getDownloadURL(value.ref).then((url)=>{
          console.log("url",url)
          setImage(url)
        })
      })
    }
    else{
      console.log("no file selected")
    }
  };



  if(localStorage.getItem('role')===""){
    return(
      <Option/>
    )
  }

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Update Your Profile
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to aceternity if you can because we don&apos;t have a login flow
        yet
      </p>

      <form className="my-8">
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" value={firstName} onChange={(e)=>setFirstName(e.target.value)} placeholder="Tyler" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" value={lastName} onChange={(e)=>setLastName(e.target.value)} placeholder="Durden" type="text" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="file">Profile Picture</Label>
          <Input id="file" onChange={handleFileUpload} type="file" />
        </LabelInputContainer>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="company">Company Name</Label>
            <Input id="company" value={company} onChange={(e)=>setCompany(e.target.value)} placeholder="Amazon" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="positon">Company position</Label>
            <Input id="positon" value={currentPosi} onChange={(e)=>setCurrentPosi(e.target.value)} placeholder="SDE" type="text" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer>
            <Label htmlFor="about">About Yourself</Label>
            <Input id="about" value={about} onChange={(e)=>setAbout(e.target.value)} placeholder="Hi i am a great guy with positive aura" type="text" />
        </LabelInputContainer>
        <LabelInputContainer className="mt-4">
            <Label htmlFor="contact">Contact number</Label>
            <Input id="contact" value={contact} onChange={(e)=>setContact(e.target.value)} placeholder="7796327571" type="text" />
          </LabelInputContainer>

        {loading?<span>Loading...</span>:<button
          className="bg-gradient-to-br relative group/btn mt-4 from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          onClick={submitForm}
        >
          Update Profile &rarr;
          <BottomGradient />
        </button>}
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

export default RecruiterEdit;