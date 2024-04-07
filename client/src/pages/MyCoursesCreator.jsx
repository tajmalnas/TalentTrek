import axios from "axios";
import { Edit, IndianRupee } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyCoursesCreator = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const fetchCourses = async () => {
    axios
      .post("/course/get-my-created-courses", {
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        console.log("response", res);
        setCourses(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="text-slate-200 w-full p-5">
      <div className="text-center text-4xl h-[15vh] w-full flex items-center justify-center bg-[#191b2e] rounded-md font-black tracking-wider">
        My Created Courses
      </div>
      <div className="grid grid-cols-3 gap-6 mt-5">
        {courses.map((course) => (
          <div
            key={course._id}
            className="flex rounded-xl bg-slate-900 flex-col justify-between border-b border-gray-600"
          >
            <div className="flex items-center justify-center">
              <img
                className="w-full object-cover h-40"
                src={course.image}
                alt="course"
              />
            </div>
            <div className=" p-4  bg-[#2d2f40]">
              <div className="text-center font-bold mt-4 text-2xl">
                {course.name}
              </div>
              <div className="text-center mt-2 text-gray-400">
                {course.description}
              </div>
              <div className="text-center mt-2">{course.skills}</div>
              <div className="mt-4 flex justify-between ">
                <div className="text-emerald-600 items-center flex text-2xl font-bold tracking-wide">
                  <IndianRupee />
                  {course.price}
                </div>
                <div
                  className="bg-blue-500 items-center rounded p-2 w-20 flex hover:bg-indigo-600 hover:cursor-pointer"
                  onClick={() => navigate(`/edit-course/${course._id}`)}
                >
                  <Edit size={18} className="text-slate-200 m-1" />
                  Edit
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCoursesCreator;
