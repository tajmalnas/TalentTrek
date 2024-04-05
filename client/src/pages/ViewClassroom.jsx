import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ViewClassroom = () => {
    const location = useLocation();
    const classroomId = location.pathname.split("/")[2];
    console.log(classroomId);

    const fetchClassroom = async () => {
        try {
            axios.post("/classroom/view-classroom", {
                classroomId
            }).then((res) => {
                console.log("response", res);
            }).catch((err) => {
                console.log(err.response);
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchClassroom();
    }, []);
  return (
    <div className='min-h-screen w-full'>
        <div className="text-center text-4xl h-[28vh] w-full bg-[#191b2e] rounded-md mb-5"></div>
        
    </div>
  )
}

export default ViewClassroom;
