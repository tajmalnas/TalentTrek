import axios from "axios";
import { Edit, IndianRupee } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyCoursesCreator = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    const fetchCourses = async () => {
        axios.post('/course/get-my-created-courses', {
            token:localStorage.getItem('token')
        }).then((res) => {
            console.log("response",res)
            setCourses(res.data);
        }).catch((err) => {
            console.log(err.response);
        });
    }

    useEffect(() => {
        fetchCourses();
    },[]);

  return (
    <div className="text-white">
        <div className="text-center text-4xl">My Created Courses</div>
        <div className="flex justify-between gap-4 p-4 border-b border-gray-600">
            {courses.map((course) => (
                <div key={course._id} className="flex w-60 bg-slate-900 rounded-lg flex-col justify-between p-4 border-b border-gray-600">
                    <div className="flex items-center justify-center"><img className="w-50 h-40" src={course.image} alt="course" /></div>
                    <div className="text-center text-xl">{course.name}</div>
                    <div className="text-gray-500">{course.description}</div>
                    <div>{course.skills}</div>
                    <div className="flex justify-between">
                        <div className="bg-blue-700 items-center rounded p-2 w-16 flex">
                            <IndianRupee
                                size={16}
                                className="text-white"
                            />
                            {course.price}
                        </div>
                        <div className="border border-blue-700 items-center rounded p-2 w-20 flex hover:bg-blue-800 hover:cursor-pointer"
                            onClick={() => navigate(`/edit-course/${course._id}`)}
                        >
                            <Edit
                                size={18}
                                className="text-white m-1"
                            />
                            Edit
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default MyCoursesCreator