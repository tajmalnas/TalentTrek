import React, { useEffect , useState} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ViewClassroom = () => {
    const location = useLocation();
    const [classroom, setClassroom] = useState({});
    const [classVideos, setClassVideos] = useState([]);

    const fetchClassroom = async (classroomId) => {
        // try {
        //     axios.post("/classroom/view-classroom", {
        //         classroomId
        //     }).then((res) => {
        //         console.log("response", res?.data?.classroom);
        //         setClassroom(res?.data?.classroom);
        //     }).catch((err) => {
        //         console.log(err.response);
        //     });
        // } catch (err) {
        //     console.log(err.message);
        // }
        try {
            const res = await axios.post("/classroom/view-classroom", {classroomId});
            console.log(res?.data?.classroom);
            setClassroom(res?.data?.classroom);
            setClassVideos(res?.data?.classroom?.videos);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const classroomId = location.pathname.split("/")[2];
        console.log(classroomId);
        fetchClassroom(classroomId);
    }, []);
  return (
    <div className='min-h-screen w-full'>
        <div className="text-center text-4xl h-[28vh] w-full bg-[#191b2e] rounded-md mb-5"></div>
        <div className="h-[10vh] w-full flex justify-between mb-7">
        <div className="text-white">
          <div className="text-3xl font-medium tracking-wider">
            {classroom?.name}
          </div>
          <div className="text-lg font-medium text-slate-500">{classroom?.description}</div>
        </div>
        </div>
        <div className="w-full flex">
        {classVideos?.map((video, index) => {
            return (
                <div key={index} className="w-1/3 p-4 ">
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <video controls className="w-full">
                            <source src={video.videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <div className="text-lg font-medium mt-2">
                            {video.videoTitle}
                        </div>
                    </div>
                </div>
            );
          })}
    </div>
    </div>
  )
}

export default ViewClassroom;
