import axios from "axios";
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import MCQsTestPage from "./MCQS-test-videocam/MCQ2";

const MyCourseStudentOneCourse = () => {

    const [courseData,setCourseData] = useState({});
    const [tab,setTab] = useState(1);
    const location = useLocation();
    const courseId = location.pathname.split("/")[2];

    const fetchCourseData = async () =>{
      try{
        axios.post('/course/get-course',{
          courseId
        }).then((res)=>{
          console.log("response",res)
          setCourseData(res.data)
        }).catch((err)=>{
          console.log(err.response)
        })
      }catch(err){
        console.log(err.message)
      }
    }

    useEffect(()=>{
        fetchCourseData()
    },[])

  return (
    <div className="text-white w-full">
      <div className="text-center text-4xl h-[15vh] w-full flex items-center justify-center bg-[#191b2e] rounded-md mb-5">{courseData.name}</div>
      <div className="flex gap-8 mt-4 p-4 border-b">
          <button className={"border border-white rounded-md py-1 px-4 " + (tab===1?"bg-white font-semibold text-black":"")} onClick={()=>setTab(1)}>Videos</button>
          <button className={"border border-white rounded-md py-1 px-4 " + (tab===2?"bg-white font-semibold text-black":"")} onClick={()=>setTab(2)}>AI Test</button>
          <button className={"border border-white rounded-md py-1 px-4 " + (tab===3?"bg-white font-semibold text-black":"")} onClick={()=>setTab(3)}>Final Test</button>
      </div>
      {tab===1 && <div className="flex w-full">
            {
                courseData?.videos?.map((video,index) => {
                    return(
                        <div key={index} className="w-1/3 p-4">
                            <div className="bg-gray-800 p-4 rounded-lg">
                                <video className="w-full h-60">
                                    <source src={video.videoUrl}
                                     autoPlay={false}
                                     type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                <div className="text-lg font-medium mt-2">{video.videoTitle}</div>
                            </div>
                        </div>
                    )
                })
            }
          </div>
      }
      {tab===3 && <MCQsTestPage courseData = {courseData}/>}
      {tab===2 && <div className="flex w-full">
            {
                courseData?.test?.map((question,index) => {
                    return(
                        <div key={index} className="w-1/3 p-4">
                            <div className="bg-gray-800 p-4 rounded-lg">
                                <div className="text-lg font-medium mt-2">{question.question}</div>
                                <div className="text-lg font-medium mt-2">{question.options[0]}</div>
                                <div className="text-lg font-medium mt-2">{question.options[1]}</div>
                                <div className="text-lg font-medium mt-2">{question.options[2]}</div>
                                <div className="text-lg font-medium mt-2">{question.options[3]}</div>
                            </div>
                        </div>
                    )
                })
            }
          </div>
      }
    </div>
  )
}

export default MyCourseStudentOneCourse