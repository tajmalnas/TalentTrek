import React, { useEffect , useState} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

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
    }
    useEffect(() => {
        const token = localStorage.getItem('token');
        getCreatorClassrooms(token);
    }, [])

  return (
    <div className='min-h-screen w-full'>
      <div className="text-center text-4xl h-[12vh] w-full bg-[#191b2e] rounded-md mb-10 flex justify-between items-center">
        <div className="text-3xl font-medium tracking-wider text-white ml-10" >
            Created Classes
        </div>
      </div>
      <div className="grid grid-cols-3 justify-center items-center">
        {
            classrooms.length && classrooms.map((classroom) => (
                <div className="flex-col gap-4 h-[50vh] w-[50vh] bg-[#191b2e] rounded-md cursor-pointer bg-opacity-100 hover:bg-opacity-90 transition duration-300 mb-10">
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
                <div className="text-md font-normal pl-2 text-slate-400">
                  {classroom?.description}
                </div>
                <div className="text-md font-normal pl-2 text-slate-400">
                  {classroom?.students.length} Student/s joined
                </div>
              </div>
              <div className="w-full h-[20%] flex justify-center">
                <Link
                  to={`/edit-classroom/${classroom?._id}`}
                  className="p-2 bg-indigo-500 hover:bg-indigo-600 h-10 w-10 rounded-full flex justify-center items-center"
                >
                  <Button className="bg-indigo-500 hover:bg-indigo-600 tracking-wider justify-center items-center">Edit Classroom</Button>
                </Link>
                
              </div>
              
                </div>
            ))
        }
      </div>
    </div>
  )
}

export default CreatorClassrooms
