import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import classroomHeader from "../assets/classroom.jpg";
import MCQsTestPage3 from "./MCQS-test-videocam/MCQ3";

const ViewClassroom = () => {
  const location = useLocation();
  const [classroom, setClassroom] = useState({});
  const [classVideos, setClassVideos] = useState([]);
  const [classroomId, setClassroomId] = useState("");
  const [finalTestUnlocked, setFinalTestUnlocked] = useState(false);
  const fetchClassroom = async (classroomId) => {
    try {
      const res = await axios.post("/classroom/view-classroom", {
        classroomId,
      });
      console.log(res?.data?.classroom);
      setClassroom(res?.data?.classroom);
      setClassVideos(res?.data?.classroom?.videos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const classroomId = location.pathname.split("/")[2];
    setClassroomId(classroomId);
    console.log(classroomId);
    fetchClassroom(classroomId);
  }, []);
  return (
    <div>
    {!finalTestUnlocked ?(<div className="min-h-screen w-full p-5 mb-14 text-slate-200">
      <div className="relative">
        <img
          src={classroomHeader}
          className="object-cover h-60 w-full rounded-xl"
          alt="classroom header"
        />
        <div className="absolute bottom-14 left-10">
          <div className="text-5xl font-black tracking-wider">
            {classroom?.name}
          </div>
          <div className="text-xl font-medium mt-4">
            {classroom?.description}
          </div>
        </div>
      </div>

      <div className="mt-5 w-full">
        <div className="w-full flex flex-col gap-5">
          {classVideos?.map((video, index) => {
            return (
              <div
                key={index}
                className="w-full p-4 flex gap-6 items-center bg-[#191b2e] rounded-xl justify-between"
              >
                <div className=" flex flex-col gap-4 w-2/3">
                  <div className="text-2xl font-bold text-slate-300 tracking-wider">
                    {video.videoTitle}
                  </div>
                  <div className="text-lg font-normal mt-2 text-slate-400 tracking-wider text-justify line-clamp-4">
                    {video?.videoDescription}
                  </div>
                </div>
                <div className="flex justify-end w-1/3 p-1 bg-slate-400 rounded-xl">
                  <video
                    controls
                    className="w-full h-[85%] flex-end rounded-xl "
                  >
                    <source src={video.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end">
            <Button className="mt-10 px-4 py-6 text-xl font-medium bg-indigo-500 hover:bg-indigo-600 tracking-wider rounded-xl"
              onClick={() => setFinalTestUnlocked(true)}
            >
              Attempt Final Test
            </Button>
        </div>
      </div>
    </div>):(
      <MCQsTestPage3 classroomData= {classroom}/>
    )}
    </div>
  );
};

export default ViewClassroom;
