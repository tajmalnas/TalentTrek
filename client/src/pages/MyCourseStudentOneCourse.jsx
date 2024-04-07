import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MCQsTestPage from "./MCQS-test-videocam/MCQ2";

const MyCourseStudentOneCourse = () => {
  const [courseData, setCourseData] = useState({});
  const [tab, setTab] = useState(1);
  const location = useLocation();
  const courseId = location.pathname.split("/")[2];

  const fetchCourseData = async () => {
    try {
      axios
        .post("/course/get-course", {
          courseId,
        })
        .then((res) => {
          console.log("response", res);
          setCourseData(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  return (
    <div className="text-slate-200 w-full p-5">
      <div className="text-center text-4xl w-full bg-[#191b2e] rounded-xl p-4 font-black tracking-wider">
        {courseData.name}
      </div>
      <div className="flex gap-8 py-4 border-b border-[#2d2f40]">
        <button
          className={
            "border border-slate-200 rounded-xl font-medium tracking-wide px-4 h-9 text-lg " +
            (tab === 1 ? "bg-slate-200 font-semibold text-black" : "")
          }
          onClick={() => setTab(1)}
        >
          Videos
        </button>
        <button
          className={
            "border border-slate-200 rounded-xl font-medium tracking-wide px-4 h-9 text-lg " +
            (tab === 2 ? "bg-slate-200 font-semibold text-black" : "")
          }
          onClick={() => setTab(2)}
        >
          AI Test
        </button>
        <button
          className={
            "border border-slate-200 rounded-xl font-medium tracking-wide px-4 h-9 text-lg " +
            (tab === 3 ? "bg-slate-200 font-semibold text-black" : "")
          }
          onClick={() => setTab(3)}
        >
          Final Test
        </button>
      </div>
      {tab === 1 && (
        <div className="grid grid-cols-3 gap-6 w-full mt-4">
          {courseData?.videos?.map((video, index) => {
            return (
              <div key={index} className="">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <video className="w-full h-60 object-cover">
                    <source
                      src={video.videoUrl}
                      autoPlay={false}
                      type="video/mp4"
                      className=""
                    />
                    Your browser does not support the video tag.
                  </video>
                  <div className="text-lg  text-center font-medium mt-4 ">
                    {video.videoTitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {tab === 3 && <MCQsTestPage courseData={courseData} />}
      {tab === 2 && (
        <div className="flex w-full">
          {courseData?.test?.map((question, index) => {
            return (
              <div key={index} className="w-1/3 p-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="text-lg font-medium mt-2">
                    {question.question}
                  </div>
                  <div className="text-lg font-medium mt-2">
                    {question.options[0]}
                  </div>
                  <div className="text-lg font-medium mt-2">
                    {question.options[1]}
                  </div>
                  <div className="text-lg font-medium mt-2">
                    {question.options[2]}
                  </div>
                  <div className="text-lg font-medium mt-2">
                    {question.options[3]}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyCourseStudentOneCourse;
