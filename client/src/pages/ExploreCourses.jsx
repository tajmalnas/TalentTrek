/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import { IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const ExploreCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const fetchALlCourses = async () => {
    try {
      axios
        .get("/course/get-all-courses")
        .then((res) => {
          console.log("response", res);
          setCourses(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  const enrollInCourse = async (courseId) => {
    try {
      axios
        .post("/course/enroll-in-course", {
          courseId,
          token: localStorage.getItem("token"),
        })
        .then((res) => {
          console.log("response", res);
          toast.success("Course Enrolled Successfully");
          navigate("/my-courses-candidates");
        })
        .catch((err) => {
          console.log(err.response);
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchALlCourses();
  }, []);

  return (
    <div className="text-slate-200 w-full p-5">
      <div className="text-center text-4xl h-[15vh] w-full flex items-center justify-center bg-[#191b2e] rounded-md font-black tracking-wider">
        Explore Courses
      </div>

      <div class="mt-5 md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 space-y-4 md:space-y-0">
        {courses.length > 0 ? (
          courses.map((course, index) => {
            return (
              <div
                key={index}
                class="bg-[#191b2e] px-5    pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500"
              >
                <h3 class="mb-3 text-xl font-bold text-indigo-600">
                  Beginner Friendly
                </h3>
                <div class="relative">
                  <img
                    class="w-full rounded-xl h-40 object-cover"
                    src={course.image}
                    alt="Colors"
                  />
                  <p class="absolute top-0 bg-yellow-500 text-white font-semibold py-2 px-4 rounded-br-lg rounded-tl-lg flex justify-center item-center">
                    <IndianRupee size={18} />
                    <span>{course.price}</span>
                  </p>
                </div>
                <h1 class="mt-4 text-white text-xl font-bold cursor-pointer">
                  {course.name}
                </h1>
                <div class="my-4">
                  <div class="flex space-x-1 items-center">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 text-indigo-600 mb-1.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </span>
                    <p>{course.videos.length} Parts</p>
                  </div>
                  <div class="flex space-x-1 items-center">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 text-indigo-600 mb-1.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                      </svg>
                    </span>
                    <p>{course.skills[0]}</p>
                  </div>
                  <button
                    class="mt-4 text-xl w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg"
                    onClick={() => enrollInCourse(course._id)}
                  >
                    Purchase
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-2xl">No Courses Available</div>
        )}
      </div>
    </div>
  );
};

export default ExploreCourses;
