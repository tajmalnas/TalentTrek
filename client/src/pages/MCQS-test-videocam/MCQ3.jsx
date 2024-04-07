import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as faceapi from 'face-api.js';
import { IconNumbers } from '@tabler/icons-react';
import { HelpCircleIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MCQsTestPage3 = ({classroomData}) => {
    const navigate = useNavigate();
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [questionNumber, setQuestionNumber] = useState(1);
    const [remainingTime, setRemainingTime] = useState(600);
    const [testStarted, setTestStarted] = useState(false);
    const [inactivityTimer, setInactivityTimer] = useState(null);
    const [finalArray, setFinalArray] = useState(classroomData.test.map(question => ({
        ...question,
        selectedOption: '' // Initialize with an empty string or any other initial value you prefer
      })));

    useEffect(() => {
        let timer = null;
        if (remainingTime > 0 && testStarted && !submitted) {
          timer = setTimeout(() => {
            setRemainingTime(prevTime => prevTime - 1);
          }, 1000);
        } else if (remainingTime === 0 && testStarted && !submitted) {
          handleSubmit();
        }
        return () => clearTimeout(timer);
      }, [remainingTime, testStarted, submitted]);
    
      useEffect(() => {
        const handleVisibilityChange = () => {
          if (document.visibilityState === 'hidden' && testStarted) {
            document.title = 'Please focus on the test!';
            alert("You are not allowed to change tabs. If tab is changed for more than 5 seconds cheating will be considered")
            setInactivityTimer(setTimeout(() => {
              alert("You've been inactive. AI proctoring round is over due to cheating. Your test will be automatically submitted.");
              handleSubmit();
              // navigate(`/classroom/${classroomData._id}/warning`)
            }, 5000));
          } else {
            document.title = 'Test in Progress';
            clearTimeout(inactivityTimer);
          }
        };
    
        document.addEventListener('visibilitychange', handleVisibilityChange);
    
        return () => {
          document.removeEventListener('visibilitychange', handleVisibilityChange);
          clearTimeout(inactivityTimer);
        };
      }, [inactivityTimer, testStarted]);
    
      const handleSelectAnswer = (optionIndex, questionIndex) => {
        let opt = "A";
        if(optionIndex === 1) {
            opt = "B";
        } else if(optionIndex === 2) {
            opt = "C";
        } else if(optionIndex === 3) {
            opt = "D";
        }
        
        const newFinalArray = [...finalArray];
        // Update the selectedOption field for the question at questionIndex
        newFinalArray[questionIndex].selectedOption = opt;
        // Set the updated array back to state
        setFinalArray(newFinalArray);
        console.log(finalArray);    
      };
    
    //   const displayAnswer = (type, questionIndex, selectedOption) => {
    //     if (submitted) {
    //       if (selectedOption === mcqs[type][questionIndex].answer) {
    //         return <span className="text-green-500">Correct!</span>;
    //       } else {
    //         return (
    //           <>
    //             <span className="text-red-500">Incorrect!</span>
    //           </>
    //         );
    //       }
    //     }
    //   };

      
      const calculateScore = () => {
        let score = 0;
        for (let i=0;i<finalArray.length;i++) {
            if (finalArray[i].selectedOption === finalArray[i].correctOption) {
                score++;
            }
        }
        axios.post('/final-test-classroom',{
            token:localStorage.getItem('token'),
            classroomId:classroomData._id,
            marks:score,
            totalMarks:finalArray.length
        }).then((res) => {
            console.log("response",res)
            toast.success("Test Submitted Successfully");
            // navigate(`/classroom/${classroomData._id}/warning`);
        }
        ).catch((err) => {
            console.log(err.response);
        });
        return score;
      };
    
      const handleSubmit = () => {
        setSubmitted(true);
        const video = document.querySelector('video');
        if (video) {
          video.pause();
          document.body.removeChild(video);
        }
      };
    
      const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
      };
    
      const handleStartTest = () => {
        setTestStarted(true);
      };

      useEffect(() => {
        if (testStarted) {
          const video = document.createElement('video');
          video.style.position = 'fixed';
          video.style.top = '10px';
          video.style.right = '10px';
          video.style.width = '200px';
          video.style.height = 'auto';
          document.body.appendChild(video);
      
          let isAlertDisplayed = false;
          let inactivityTimer = null;
      
          Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('models'),
            faceapi.nets.faceExpressionNet.loadFromUri('models')
          ]).then(startVideo);
      
          function startVideo() {
            navigator.mediaDevices.getUserMedia({ video: {} })
              .then(stream => {
                video.srcObject = stream;
                video.play();
              })
              .catch(err => console.error(err));
          }
      
          function handleVisibilityChange() {
            if (document.visibilityState === 'hidden' && !isAlertDisplayed) {
              clearTimeout(inactivityTimer);
              alert("You are not allowed to change tabs. If tab is changed for more than 5 seconds cheating will be considered");
              inactivityTimer = setTimeout(() => {
                isAlertDisplayed = true;
                alert("You've been inactive. AI proctoring round is over due to cheating. Your test will be automatically submitted.");
                video.pause();
                const canvas = document.querySelector('canvas');
                if (canvas) {
                  document.body.removeChild(canvas);
                }
                document.body.removeChild(video);
              }, 5000); // 5 seconds
            } else {
                document.title = 'Test in Progress';
                clearTimeout(inactivityTimer);
            }
          }
          
      
          document.addEventListener('visibilitychange', handleVisibilityChange);
      
          video.addEventListener('play', () => {
            const canvas = faceapi.createCanvasFromMedia(video);
            document.body.append(canvas);
            const displaySize = { width: video.width, height: video.height };
            faceapi.matchDimensions(canvas, displaySize);
            setInterval(async () => {
              const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
              const numFaces = detections.length;
              
              console.log(numFaces)

              if (numFaces >= 2 && !isAlertDisplayed) {
                isAlertDisplayed = true;
                alert('Two faces detected on the screen.');
                setTimeout(() => {
                  isAlertDisplayed = false;
                }, 5000);
              }
              
              if (numFaces >= 2) {
                video.pause(); // Pause the video if two or more faces detected
              } else {
                video.play(); // Continue playing the video if less than two faces detected
              }

              if (numFaces == 0 && !isAlertDisplayed) {
                isAlertDisplayed = true;
                alert('No face detected on the screen.');
                setTimeout(() => {
                  isAlertDisplayed = false;
                }, 5000);
              }

              if(numFaces==0) {
                video.pause();
              } else {
                video.play();
              }

              const resizedDetections = faceapi.resizeResults(detections, displaySize);
              canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
              faceapi.draw.drawDetections(canvas, resizedDetections);
              faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
              faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
            }, 100);
          });
      
          return () => {
            document.body.removeChild(video);
          };
        }
      }, [testStarted]);
      

  return (
    <div className="transform scale-65 relative top-0 text-white">
      {!testStarted && (
        <button
          onClick={handleStartTest}
          className="px-4 py-2 bg-blue-500 m-4 text-white rounded-md hover:bg-blue-600"
        >
          Start Test
        </button>
      )}
      {testStarted && (
        <p className="mb-2 text-lg">Remaining Time: {formatTime(remainingTime)}</p>
    )}
      {testStarted && classroomData?.test?.map((mcq, index) => {
        const currentQuestionNumber = questionNumber + index;
        return (
          <div key={index} className='mt-16'>
            <h3 className="text-xl font-semibold">{`Question ${currentQuestionNumber}: ${mcq.question}`}</h3>
            <p className="text-gray-500 mb-2">Choose 1 answer</p>
            <hr className="my-4" />
            {mcq.options.map((option, optionIndex) => (
              <div key={optionIndex} id={`block-${index}-${optionIndex}`} className="flex items-center mb-2">
                <input
                  type="radio"
                  name={`option-${index}`}
                  value={option}
                  id={`option-${index}-${optionIndex}`}
                  className="mr-2 transform scale-150"
                  onChange={() => handleSelectAnswer(optionIndex, index)}
                />
                <label htmlFor={`option-${index}-${optionIndex}`} className="text-lg">{option}</label>
                {/* <span id={`result-${index}-${optionIndex}`} className="ml-4">{selectedAnswers[`${selectedType}-${index}`] === option ? displayAnswer(selectedType, index, option) : null}</span> */}
              </div>
            ))}
            <hr className="my-4" />
          </div>
        );
      })}

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        disabled={submitted}
      >
        Submit
      </button>
      {submitted && (
        <p className="text-lg mt-4">
          Your Score: {calculateScore()} / {finalArray.length}
        </p>
      )}
    
    </div>
  );
};

export default MCQsTestPage3;
