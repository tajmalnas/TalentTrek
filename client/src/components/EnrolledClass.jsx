import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PlusCircle } from "lucide-react";
import axios from "axios";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const EnrolledClass = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [classCode, setClassCode] = useState("");

  const getEnrolledClassroom = async (token) => {
    try {
      const res = await axios.post("/classroom/get-enrolled", { token });
      console.log(res?.data?.classrooms);
      setClassrooms(res?.data?.classrooms);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEnroll = async (classCode) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("/classroom/enroll", { token, classCode });
      console.log(res?.data?.classroom);
      if (res?.data?.classroom) {
        toast.success("Classroom Enrolled Successfully");
        setClassrooms([...classrooms, res?.data?.classroom]);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleJoin = (e) => {
    e.preventDefault();
    handleEnroll(classCode);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    // const candidateId = getCandidateId();
    getEnrolledClassroom(token);
  }, []);
  return (
    <div className="flex flex-col gap-10 w-full min-h-screen">
      <div className="text-center text-4xl h-[12vh] w-full bg-[#191b2e] rounded-md mb-5 flex justify-between items-center">
        <div className="text-3xl font-medium tracking-wider text-white ml-10">
          Enrolled Classes
        </div>
        <div className="mr-10">
          {/* <div className="p-3 flex gap-2 font-medium tracking-wide text-slate-100 text-sm border border-sky-600 hover:bg-blue-500 hover:text-white hover:cursor-pointer rounded-xl">
        <PlusCircle size={20} />    
          Join Class
        </div> */}

          <Dialog>
            <DialogTrigger>
              <div className="p-3 flex gap-2 font-medium tracking-wide text-slate-100 text-sm border border-sky-600 hover:bg-blue-500 hover:text-white hover:cursor-pointer rounded-xl">
                <PlusCircle size={20} />
                Join Class
              </div>
            </DialogTrigger>

            <DialogContent className="">
              <div className="flex flex-col">
                <div>
                  <label className="text-black text-lg">Enter Class Code</label>
                  <input
                    type="text"
                    value={classCode}
                    onChange={(e) => setClassCode(e.target.value)}
                    className="w-full p-2 bg-gray-100 border border-black rounded-lg mt-3"
                  />
                </div>
                <div className="flex">
                  <Button
                    className="mt-6 bg-indigo-500 hover:bg-indigo-600"
                    onClick={handleJoin}
                  >
                    Join Class
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-10 justify-center items-center">
        {classrooms.length &&
          classrooms.map((classroom) => (
            <div className="flex-col gap-4 h-[50vh] w-[50vh] bg-[#191b2e] rounded-md cursor-pointer bg-opacity-100 hover:bg-opacity-90 transition duration-300 ">
              <div className="w-full h-[50%] bg-slate-200 overflow-auto">
                <img
                  src={classroom?.image}
                  alt="classimg"
                  className="w-full h-full overflow-hidden"
                />
              </div>
              <div className="text-white w-full h-[30%] flex flex-col gap-1 p-2 mt-3">
                <div className="text-2xl font-medium text-blue-500 tracking-wide pl-2">
                  {classroom?.name}
                </div>
                <div className="text-lg font-normal pl-2 text-slate-300">
                  {classroom?.description}
                </div>
              </div>
              <div className="w-full h-[20%] flex justify-center">
                <Link
                  to={`/classroom/${classroom?._id}`}
                  className="p-2 bg-indigo-500 hover:bg-indigo-600 h-10 w-10 rounded-full flex justify-center items-center"
                >
                  <Button className="bg-indigo-500 hover:bg-indigo-600 tracking-wider justify-center items-center">View Classroom</Button>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default EnrolledClass;
