import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const MyCoursesCandidates = () => {

    const [courses, setCourses] = useState([{}]);
    const navigate = useNavigate();

    const fetchCourses = async() => {
        try{
            axios.post('/course/my-course-candidates',{
                token:localStorage.getItem('token')
            }).then((res) => {
                setCourses(res.data);
                console.log("response",res)
            }).catch((err) => {
                console.log(err.response);
            });
        }catch(err){
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchCourses();
    },[])

  return (
    <div className="text-white w-full">
        <div className="text-center text-4xl h-[15vh] w-full flex items-center justify-center bg-[#191b2e] rounded-md mb-5">Explore Courses</div>  
            <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 space-y-4 md:space-y-0">
                {
                    courses.length > 0 && courses.map((course, index) => {
                        return(
                            <div key={index} onClick={()=>navigate("/my-courses/"+course._id)} className="bg-[#191b2e] px-5 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
                                <div>
                                    <img src ={course.image} alt="Colors" className="w-full rounded-xl h-40 object-cover" />
                                </div>
                                <div>
                                    <h1 className="mt-4 text-white text-xl font-bold cursor-pointer">{course.name}</h1>
                                </div>
                                <div className="my-4">
                                    <div className="flex space-x-1 items-center">
                                        <h1 className="text-white text-lg font-semibold">{course.description}</h1>
                                    </div>
                                </div>
                                <button
                                  className="mt-4 text-xl w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg"
                                  onClick={() => navigate("/my-courses/"+ course._id)}
                                >
                                  Go To Course
                                </button>
                            </div>
                        )
                    })
                }
            </div>  
    </div>
  )
}

export default MyCoursesCandidates