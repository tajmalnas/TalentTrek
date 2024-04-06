import React, { useEffect , useState} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../components/ui/table";
import { Button } from '@/components/ui/button';

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
        <div className="w-full flex-col">
        <Table className="w-full">
            <TableBody className="w-full">
            {classVideos?.map((video, index) => {
            return (
                <TableRow key={index} className="w-full p-4 max-h-[40vh] justify-between">
                  <TableCell className="">
                      <div className="text-lg font-normal mt-2 text-slate-300 tracking-wider">
                            {video.videoTitle}
                        </div>
                      </TableCell>
                      <TableCell className="flex justify-end">
                      <video controls className="w-[35%] h-[85%] flex-end">
                            <source src={video.videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                      </TableCell>
                      
                </TableRow>
            );
          })}
            </TableBody>
          </Table>
          <Button className="mt-10 ml-4 mb-10 h-[8vh] w-[30vh] text-lg bg-blue-700 tracking-wider ">Attempt Final Test</Button>
    </div>
    </div>
  )
}

export default ViewClassroom;
