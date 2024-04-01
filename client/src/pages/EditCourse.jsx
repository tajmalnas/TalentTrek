import axios from "axios";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
import { Button } from "@/components/ui/button";
import { imageDb } from "@/firebase/firebaseConfig";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const EditCourse = () => {
    const location = useLocation();
    console.log(location);
    const courseId = location.pathname.split("/")[2];
    const [courseVideos, setCourseVideos] = useState([]);
    const [videoName, setVideoName] = useState('')
    const [videoUrl, setVideoUrl] = useState('')

    const fetchContent = async () => {
        try{
            axios.post('/course/get-course', {
                courseId
            }).then((res) => {
                console.log("response",res)
                setCourseVideos(res.data.videos);
                console.log("courseVideos",courseVideos)
            }).catch((err) => {
                console.log(err.response);
            });
        }catch(err){
            console.log(err.message);
        }
    }

    const handleFileUpload = (e) => {
        const selectedFile = e.target.files[0];
        if(selectedFile){
          const imgref = ref(imageDb,`files/${v4()}`)
          uploadBytes(imgref,selectedFile).then((value)=>{
            console.log("image uploaded",value)
            getDownloadURL(value.ref).then((url)=>{
              console.log("url",url)
              setVideoUrl(url)
            })
          })
        }
        else{
          console.log("no file selected")
        }
      };

    const submitHandler = async(e) =>{
        e.preventDefault();
        if(videoName==="" || videoUrl===""){
            console.log("Please fill all the fields")
          return
        }
        await axios.post('/course/add-video', {
          courseId,
          name:videoName,
          url:videoUrl
        }).then((res) => {
          console.log("response",res)
            setVideoName('')
            setVideoUrl('')
            fetchContent();
        }).catch((err) => {
          console.log(err.response);
        });
    }

    useEffect(()=>{
        fetchContent();
    },[])

  return (
    <div className="text-white">
        <div className="text-center text-4xl">Edit Course</div>
        <div className="flex w-full">
            {
                courseVideos.map((video,index) => {
                    return(
                        <div key={index} className="w-1/3 p-4">
                            <div className="bg-gray-800 p-4 rounded-lg">
                                <video controls className="w-full">
                                    <source src={video.videoUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                <div className="text-lg font-medium mt-2">{video.videoTitle}</div>
                            </div>
                        </div>
                    )
                })
            }
            <Dialog>
            <DialogTrigger>
              <div
                className="p-2 flex gap-2 font-medium tracking-wide text-slate-100 text-sm border border-sky-600 hover:bg-blue-500 hover:text-white hover:cursor-pointer rounded-xl rounded-br-none"
              >
                <PlusCircle size={20} />
                Add Video
              </div>
            </DialogTrigger>

            <DialogContent className="">
              <div className="flex flex-col">
                <div>
                    <label className="text-black">Title</label>
                    <input type="text" value={videoName} onChange={e=>setVideoName(e.target.value)} className="w-full p-2 bg-gray-100 border border-black rounded-lg" />
                </div>
                <div>
                    <label className="text-black">Video</label>
                    <input type="file" onChange={handleFileUpload} className="w-full p-2 bg-gray-100 border border-black rounded-lg" />
                </div>
                <div className="flex">
                  <Button
                    className="mt-6 bg-indigo-500 hover:bg-indigo-600"
                    onClick={submitHandler}
                  >
                    Add Video
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
    </div>
  )
}

export default EditCourse