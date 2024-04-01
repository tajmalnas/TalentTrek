/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from 'axios';
import { useState, useEffect,useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Webcam from "react-webcam";
import { toast } from 'react-toastify';

const SpeechToText = ({setPerformance}) => {
    const location = useLocation();

    const [isRecording, setIsRecording] = useState(false);
    const [note, setNote] = useState('');
    const [notesStore, setNotesStore] = useState([]);
    const [questions, setQuestions] = useState([
        "What is MERN stack?",
        "What is MongoDB?",
    ]);
    const [index, setIndex] = useState(0);
    const [timer, setTimer] = useState(10); 

    useEffect(() => {
        let interval;
        if (isRecording) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
            if(timer === 0){
                handleStopRecording();
                handleNextQuestion();
            }
        } else {
            clearInterval(interval);
            setTimer(10); 
        }

        return () => clearInterval(interval);
    }, [isRecording]);

    useEffect(() => {
        const handleVisibilityChange = () => {
          if (window.visibilityState === "visible") {
            // Tab is visible
            console.log("Visible");
          } else {
            // Tab is hidden
            toast.error("Please do not switch tabs!");
          }
        };
      
        window.addEventListener("visibilitychange", handleVisibilityChange);
      
        return () => window.removeEventListener("visibilitychange", handleVisibilityChange);
      }, []);
      

    const handleStartRecording = () => {
        setIsRecording(true);
        console.log(index)
    };

    const handleStopRecording = () => {
        setIsRecording(false);
        setNotesStore(prevNotes => [...prevNotes, { question: questions[index], answer: note }]);
        setNote('');
        setIndex(prevIndex => prevIndex + 1);
    };

    const handleNextQuestion = () => {
        setIndex(prevIndex => prevIndex + 1);
        setNote('');
        setTimer(10); 
    };

    const handleResetTimer = () => {
        setTimer(10);
    };

    const handleTimerComplete = () => {
        handleStopRecording();
        // handleNextQuestion();
    };

    useEffect(() => {
        if (timer === 0) {
            handleTimerComplete();
        }
    }, [timer]);


    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const microphone = new SpeechRecognition();

    microphone.continuous = true;
    microphone.interimResults = true;
    microphone.lang = "en-US";

    const startRecordController = () => {
        if (isRecording) {
            microphone.start();
        } else {
            microphone.stop();
            console.log("Stopped microphone on Click");
        }
        microphone.onstart = () => {
          console.log("microphones on");
        }; 
    
        microphone.onresult = (event) => {
          const recordingResult = Array.from(event.results)
            .map((result) => result[0])
            .map((result) => result.transcript)
            .join("");
          console.log(recordingResult);
          setNote(recordingResult);
          microphone.onerror = (event) => {
            console.log(event.error);
          };
        };
    };

    const storeNote = () => {
      setNotesStore([...notesStore, note]);
      setNote("");
    };

    const submitAssesment = () => {
        console.log(questions)
        console.log(notesStore);
        axios.post('/ai-interview/check-answer', {
            token:localStorage.getItem('token'),
            notesStore
        }).then((res)=>{
            console.log(res.data);
            if(res.data.marks){
                let mark = res.data.marks.split('/')[0];
                console.log("mark",mark);
                mark = parseInt(mark);
                const postId = location.pathname.split('/')[2];
                console.log("postId",postId);
                axios.post('/job/add-candidate-marks', {
                    postId,
                    token:localStorage.getItem('token'),
                    marks:mark
                }).then((res)=>{
                    console.log(res.data);
                })
            }
           setPerformance(res.data.analysis); 
        })
    };

    useEffect(() => {
        startRecordController();
    }, [isRecording]);

    return (
        <div>
            {index===questions.length?(<div className="text-white flex flex-row justify-center mt-2 gap-x-2 items-center">
                <h1 className='text-xl text-white'>Interview Completed</h1>
                <button className="text-black w-20 mb-2 h-16 bg-white rounded-md " onClick={submitAssesment}>Submit</button>
            </div>):(<div className="text-white flex flex-row justify-center mt-2 gap-x-2 items-center">
                {isRecording ? <span>Recording... Time left: {timer} seconds</span> : <span>Stopped </span>}
                <button className="text-black w-20 mb-2 h-16 bg-white rounded-md " onClick={handleStartRecording} disabled={isRecording}>Start</button>
                <button className="text-black w-20 mb-2 h-16 bg-white rounded-md" onClick={handleStopRecording} disabled={!isRecording}>Stop</button>
                <button className="text-black w-20 mb-2 h-16 bg-white rounded-md " onClick={handleNextQuestion} disabled={index >= questions.length}>Next</button>
            </div>)}
            <div className='bg-slate-800/70 backdrop:blur-lg rounded-md absolute w-[95%] left-4 top-2'>
                {index!==questions.length && <h2>Question</h2>}
                {isRecording===true?(<p>{questions[index]}</p>):<p>Press start when you are ready for next question</p>}
            </div>
            <div>
                <h2>Question Answer</h2>
                {notesStore.map((note, idx) => (
                    <p key={idx}>{note.question}: {note.answer}</p>
                ))}
            </div>
        </div>
    );
}


const AiInterview = () => {

    const [performance, setPerformance] = useState('');
    const paragraphs = performance.split('\n\n');
    console.log(paragraphs);
    return (
        performance.length==0 ? 
        <div className="text-white w-full text-center">
            <div>Welcome to the AiInterview</div>
                <div className='relative'>
                <div className="w-full flex justify-center items-center">
                <div>
                  <Webcam
                    crossOrigin="anonymous"
                    id="video"
                    autoPlay
                    muted
                  />
                </div>
                </div>
                <div>
                    <SpeechToText setPerformance={setPerformance} />
                </div>
            </div>
        </div>
        :
        <div className="text-white w-full text-center">
            <div>Welcome to the AiInterview</div>
                <div className='relative'>
                <h1 className="text-2xl font-bold">Performance Feedback</h1>
                <div className="w-full bg-slate-800 flex flex-col justify-center items-center">
                {paragraphs.map((paragraph, index) => (
                    <p key={index} className="mb-4 text-left p-2 text-white">{paragraph}</p>
                ))}
                </div>
            </div>
        </div>            
    )
}

export default AiInterview;