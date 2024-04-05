/* eslint-disable react/prop-types */
import { Input } from "@/components/AceComps/Input";
import { Label } from "@/components/AceComps/Label";
import { imageDb } from "@/firebase/firebaseConfig";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import clsx from "clsx"; // Import the entire clsx module
import { twMerge } from "tailwind-merge";
import { v4 } from "uuid";


export function cn(...inputs) {
    return twMerge(clsx(...inputs));
  }

const CreateCourse = () => {

    const [classroomName, setClassroomName] = useState('')
    const [classroomDescription, setClassroomDescription] = useState('')
    const [image, setImage] = useState('')
    const [skills, setSkills] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

  const submitForm = async(e) =>{
    e.preventDefault();
    if(classroomName==="" || classroomDescription==="" || image==="" || skills===""){
      toast.error("Please fill all the fields",{
        className: 'bg-slate-900 text-white'
      });
      return
    }
    setLoading(true);
    console.log(classroomName,classroomDescription,image,skills);

    await axios.post('/classroom/create', {
      token:localStorage.getItem('token'),
      name:classroomName,
      description:classroomDescription,
      image,
      skills,
    }).then((res) => {
      console.log("response",res)
        toast.success("Classroom Created succesfully", {
            className: 'bg-slate-900 text-white'
        });
      setLoading(false);
      //we will get the id of the classroom and the classroom code from the response
    navigate(`/edit-classroom/${res.data.classroom._id}`);
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


  return (
        <div className="text-white min-w-[90vh]">
            <div className="text-4xl text-center mt-4 mb-10">Create Classroom</div>
            <div>
            <div className="max-w-md mt-4 w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-[#191b2e]">

          <form className="my-8 gap-3 flex flex-col">
              <LabelInputContainer>
                <Label htmlFor="firstname">Classroom name</Label>
                <Input id="firstname" value={classroomName} onChange={(e)=>setClassroomName(e.target.value)} placeholder="Java Programming" type="text" />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastname">Classroom Description</Label>
                <Input id="lastname" value={classroomDescription} onChange={(e)=>setClassroomDescription(e.target.value)} placeholder="Classroom for java study materials" type="text" />
              </LabelInputContainer>
    
            <LabelInputContainer className="">
              <Label htmlFor="file">Thumbnail</Label>
              <Input id="file" onChange={handleFileUpload} type="file" />
            </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="company">Topics Covered</Label>
                <Input id="company" value={skills} onChange={(e)=>setSkills(e.target.value)} placeholder="OOPS, multithreading" type="text" />
              </LabelInputContainer>
            {loading?<span>Loading...</span>:<button
              className="bg-gradient-to-br relative group/btn mt-4 from-black dark:to-black  w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              onClick={submitForm}
            >
              Create Classroom &rarr;
              <BottomGradient />
            </button>}
          </form>
        </div>
        </div>
    </div>
  )
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

export default CreateCourse