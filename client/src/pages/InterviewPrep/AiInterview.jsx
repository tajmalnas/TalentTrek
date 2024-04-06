import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Webcam from "react-webcam";
import axios from 'axios';
import { toast } from 'react-toastify';

const SpeechToText = ({ setPerformance, questions }) => {
    const location = useLocation();

    const [isRecording, setIsRecording] = useState(false);
    const [note, setNote] = useState('');
    const [notesStore, setNotesStore] = useState([]);
    const [index, setIndex] = useState(0);
    const [timer, setTimer] = useState(10);
    const [inactivityTimer, setInactivityTimer] = useState(null);

    const handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden' && isRecording) {
            alert("You've been inactive. Your interview will be automatically stopped.");
            setInactivityTimer(setTimeout(() => {
                handleStopRecording();
                setPerformance("You were out of the tab for more than 5 seconds. Interview stopped.");
            }, 5000));
        } else {
            clearTimeout(inactivityTimer);
        }
    };

    useEffect(() => {
        let interval;
        if (isRecording) {
            interval = setInterval(() => {
                setTimer(prevTimer => {
                    if (prevTimer === 0) {
                        handleStopRecording();
                        handleNextQuestion();
                        return 10; // Reset the timer
                    } else {
                        return prevTimer - 1;
                    }
                });
            }, 1000);
        } else {
            clearInterval(interval);
            setTimer(10); // Reset the timer
        }

        return () => clearInterval(interval);
    }, [isRecording, index]);

    useEffect(() => {
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            clearTimeout(inactivityTimer);
        };
    }, [isRecording, inactivityTimer, setPerformance, index]);
    

    const handleStartRecording = () => {
        setIsRecording(true);
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

    const submitAssessment = () => {
        axios.post('/ai-interview/check-answer', {
            token: localStorage.getItem('token'),
            notesStore
        }).then((res) => {
            console.log(res.data);
            if (res.data.marks) {
                let mark = res.data.marks.split('/')[0];
                console.log("mark", mark);
                mark = parseInt(mark);
                const postId = location.pathname.split('/')[2];
                console.log("postId", postId);
                axios.post('/job/add-candidate-marks', {
                    postId,
                    token: localStorage.getItem('token'),
                    marks: mark
                }).then((res) => {
                    console.log(res.data);
                })
            }
            setPerformance(res.data.analysis);
        })
    };

    return (
        <div>
            {index < questions.length ? (
                <div className="text-white flex flex-row justify-center mt-2 gap-x-2 items-center">
                    {isRecording ? <span>Recording... Time left: {timer} seconds</span> : <span>Stopped </span>}
                    <button className="text-black w-20 mb-2 h-16 bg-white rounded-md " onClick={handleStartRecording} disabled={isRecording}>Start</button>
                    <button className="text-black w-20 mb-2 h-16 bg-white rounded-md" onClick={handleStopRecording} disabled={!isRecording}>Stop</button>
                    <button className="text-black w-20 mb-2 h-16 bg-white rounded-md " onClick={handleNextQuestion} disabled={index >= questions.length}>Next</button>
                </div>
            ) : (
                <div className="text-white flex flex-row justify-center mt-2 gap-x-2 items-center">
                    <h1 className='text-xl text-white'>Interview Completed</h1>
                    <button className="text-black w-20 mb-2 h-16 bg-white rounded-md " onClick={submitAssessment}>Submit</button>
                </div>
            )}
            <div className='bg-slate-800/70 backdrop:blur-lg rounded-md absolute w-[95%] left-4 top-2'>
                {index !== questions.length && <h2>Question</h2>}
                {isRecording === true ? (<p>{questions[index]}</p>) : <p>Press start when you are ready for the next question</p>}
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
    const location = useLocation();
    const [category, setCategory] = useState('');
    const [questions, setQuestions] = useState([]);

    const [performance, setPerformance] = useState('');

    useEffect(() => {
        const category = location.pathname.split('/').pop();
        setCategory(category);
        fetchQuestions(category);
    }, [location.pathname]);

    const fetchQuestions = (category) => {
        let categoryQuestions = [];
        if (category === 'dsa') {
            categoryQuestions = ["What is a linked list?", "What is a binary tree?", "Explain time complexity notation (Big O)"];
        } else if (category === 'frontend') {
            categoryQuestions = ["What is HTML?", "What is CSS?", "What is JavaScript?"];
        } else if (category === 'backend') {
            categoryQuestions = ["What is a database?", "What is REST API?", "What is Node.js?"];
        }
        setQuestions(categoryQuestions);
    };

    const paragraphs = performance.split('\n\n');

    return (
        performance.length === 0 ? (
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
                    <SpeechToText setPerformance={setPerformance} questions={questions} />
                </div>
            </div>
        </div>
    ) : (
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
)
}

export default AiInterview;
