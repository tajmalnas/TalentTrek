import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

const CreatorClassrooms = () => {
  const [classrooms, setClassrooms] = useState([]);

  const getCreatorClassrooms = async (token) => {
    try {
      const res = await axios.post("/classroom/get-creator-class", { token });
      console.log(res?.data?.classrooms);
      setClassrooms(res?.data?.classrooms);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    getCreatorClassrooms(token);
  }, []);

  return (
    <div className="text-slate-200 w-full p-5">
      <div className="text-center text-4xl h-[15vh] w-full flex items-center justify-center bg-[#191b2e] rounded-md font-black tracking-wider">
        Created Classes
      </div>
      <div className="mt-5 grid grid-cols-3">
        {classrooms.length &&
          classrooms.map((classroom) => (
            <div className="flex-col gap-4 pb-4 bg-[#191b2e] rounded-xl cursor-pointer bg-opacity-100 hover:bg-opacity-90 transition duration-300">
              <div className="w-full bg-slate-200 rounded-t-xl">
                <img
                  src={classroom?.image}
                  alt="classimg"
                  className="object-cover h-40 w-full rounded-t-xl"
                />
              </div>
              <div className="text-slate-200 w-full flex flex-col gap-1 p-4 mt-4">
                <div className="text-2xl font-medium text-blue-500 tracking-wide">
                  {classroom?.name}
                </div>
                <div className="text-md font-normal mt-2 text-slate-400">
                  {classroom?.description}
                </div>
                <div className="text-md font-normal mt-2 text-slate-400">
                  {classroom?.students.length} Student/s joined
                </div>
              </div>
              <div className="mt-4 w-full flex justify-center">
                <Link
                  to={`/edit-classroom/${classroom?._id}`}
                  className="p-4 flex w-full justify-center items-center"
                >
                  <Button className="bg-indigo-500 hover:bg-indigo-600 tracking-wider justify-center items-cente text-lg w-full">
                    Edit Classroom
                  </Button>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CreatorClassrooms;
