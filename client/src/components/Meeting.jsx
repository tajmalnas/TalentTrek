import React, {useEffect, useState} from 'react'
import {useLocation, useParams} from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import Landing from './CodeEditor/components/Editor-Landing';
import { Input } from './AceComps/Input';
import { Button } from './ui/button';
import axios from 'axios';

const MentorCall = () => {
  const {roomId} = useParams();
  const location = useLocation();

  const path = location.pathname.split('/')[2];
  const getPath = () => {
    console.log(path);
  }
  const [role, setRole] = useState("");
  const getRole = localStorage.getItem('role');
  console.log(getRole);
  const token = localStorage.getItem('token');
  console.log(token);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null); // To store any errors
  const [room, setRoom] = useState(true);

  const myMeeting = async(element) => {
    if (error) {
      return <div>Error loading face detection model: {error.message}</div>;
    }
    const appId = 1719844033;
    const serverSecret = "d120489f74f9ae1dd4342d225abb529b";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appId, serverSecret, roomId, Date.now().toString(), "Ryan Rego");

    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container : element,
      sharedLinks : [
        {
          name : 'Copy Link',
          url : `http://localhost:5173/meeting/${roomId}`
        }
      ],
      scenario : {
        mode : ZegoUIKitPrebuilt.OneONoneCall,
      }
    })
  }

  const handleChange = (e) => {
    setRole(e.target.value);
  }

  const handleFetch = async(e) => {
    e.preventDefault();
    const response = await axios.post('/template/getRoleTemplates', {
      token, role
    });
    console.log(response?.data?.roleTemplate?.questions)
    setQuestions(response?.data?.roleTemplate?.questions)
  }

  const handleJoinRoom = () => {
    console.log("joined room");
  }

  useEffect(() => {
    getPath()
  },[])

  return (
    <main>
      <div className="w-full min-h-[80px] font-semibold bg-transparent text-white flex items-center p-2 item-center justify-center text-[2.50vw]">Interview Room</div>
      <div className="mb-6 h-[55vh] min-w-full bg-white flex justify-center items-center">
        <div ref={myMeeting}/>
      </div>
      {
        getRole === 'recruiter' ? (
          <div className="w-[155vh] min-h-[29vh] flex flex-row gap-9">
            <div className="w-1/2 h-full p-7">
              <h1 className='font-medium text-lg tracking-wide mb-6 text-white'>Enter Job Role</h1>
              <Input
                name="role"
                placeholder="Backend Developer"
                value={role}
                onChange={handleChange}
                className="w-3/4"
              />
              <Button className="tracking-wide mt-5" onClick = {handleFetch}>Search for templates</Button>
            </div>
            <div className="w-1/2 min-h-full bg-[#0f172a] text-white">
              <div className="w-full p-5 font-bold text-blue-500">Template Questions</div>
              {
                questions && questions.map((que) => (
                  <div className="text-white mb-3 pl-5 pr-10">{que}</div>
                ))
              }
            </div>
          </div>
        ) : (
          <Landing id={path}/>
        )
      }
    </main>
  )
}

export default MentorCall;