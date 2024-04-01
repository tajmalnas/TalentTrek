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

    const [courseName, setCourseName] = useState('')
    const [courseDescription, setCourseDescription] = useState('')
    const [image, setImage] = useState('')
    const [skills, setSkills] = useState('')
    const [price, setPrice] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

  const submitForm = async(e) =>{
    e.preventDefault();
    if(courseName==="" || courseDescription==="" || image==="" || skills===""){
      toast.error("Please fill all the fields",{
        className: 'bg-slate-900 text-white'
      });
      return
    }
    setLoading(true);
    await axios.post('/course/create-course', {
      token:localStorage.getItem('token'),
      name:courseName,
      description:courseDescription,
      image,
      skills,
      price,
    }).then((res) => {
      console.log("response",res)
        toast.success("Course Created succesfully", {
            className: 'bg-slate-900 text-white'
        });
      setLoading(false);
      navigate(`/edit-course/${res.data.course._id}`);
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
        <div className="text-white">
            <div className="text-4xl text-center">Create Course</div>
            <div>
            <div className="max-w-md mt-4 w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-[#191b2e]">
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Update Your Profile
          </h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Login to aceternity if you can because we don&apos;t have a login flow
            yet
          </p>

          <form className="my-8">
              <LabelInputContainer>
                <Label htmlFor="firstname">Course name</Label>
                <Input id="firstname" value={courseName} onChange={(e)=>setCourseName(e.target.value)} placeholder="Master The C++" type="text" />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastname">Course Description</Label>
                <Input id="lastname" value={courseDescription} onChange={(e)=>setCourseDescription(e.target.value)} placeholder="This course is design to master c++" type="text" />
              </LabelInputContainer>
    
            <LabelInputContainer className="mb-4">
              <Label htmlFor="file">Thumbnail</Label>
              <Input id="file" onChange={handleFileUpload} type="file" />
            </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="company">Skills Teaching</Label>
                <Input id="company" value={skills} onChange={(e)=>setSkills(e.target.value)} placeholder="C++, C" type="text" />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="company">Price</Label>
                <Input id="company" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="100" type="number" />
              </LabelInputContainer>
            {loading?<span>Loading...</span>:<button
              className="bg-gradient-to-br relative group/btn mt-4 from-black dark:to-black  w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              onClick={submitForm}
            >
              Update Profile &rarr;
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