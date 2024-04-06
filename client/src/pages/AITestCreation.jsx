/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import axios from "axios"
import { PlusCircle,Trash2  } from "lucide-react";

const AITestCreation = ({courseId}) => {
  
  const [questions, setQuestions] = useState([])
  const [showAddQuestion, setShowAddQuestion] = useState(false)
  const [inputQuestion,setInputQuestion] = useState("");

  const fetchAIQuestions = async() => {
    try{
      axios.post('/course/get-ai-questions', {
        courseId
      }).then((res) => {
        console.log("response",res)
        setQuestions(res.data);
      }).catch((err) => {
        console.log(err.response);
      });
    }catch(err){
      console.log(err.message);
    }
  }

  const addQuestionToBackend = async() =>{
    if(inputQuestion===""){
      alert("Enter valid question")
      return;
    }
    axios.post('/course/add-ai-questions', {
      courseId,
      inputQuestion
    }).then(()=>{
      fetchAIQuestions();
    }).catch((err)=>{
      console.log(err.message);
    })
  }

  useEffect(()=>{
    console.log("courseId",courseId)
    fetchAIQuestions();
  },[])

  return (
    <div className="text-white w-full">
        <div className="text-2xl w-full mt-2">Rules to create Test</div>
        <div className="text-gray-200 p-2">1) You cannot add more than 5 (five) Questions in one AI-Test (As of now it is in Beta Phase Adding more questions will be available in next version)</div>
        <div className="text-gray-200 p-2">2) Design question in such manner that user can answer in 30 seconds</div>
        <div>
          {questions.length > 0 ? questions.map((question, index) => {
            return(
              <div key={index} className="bg-gray-800 p-8 flex justify-between rounded-lg mt-4">
                <div className="text-lg">{index+1}) {question.question}</div>
                <Trash2 
                  stroke={"red"}
                />
              </div>
            )})
            :
            <div className="text-xl text-center mt-4">No Questions Available</div>
          }
        </div>
        <button className="text-xl mt-2 px-2 py-1 rounded-md bg-blue-800 block" onClick={()=>setShowAddQuestion(!showAddQuestion)}>Add Question</button>
        {questions.length<5 ? (showAddQuestion && <div className="flex gap-4">
          <input onChange={e=>setInputQuestion(e.target.value)} value={inputQuestion} type="text" className="w-1/2 mt-2 p-2 bg-transparent border rounded-md" placeholder="Enter Question"/>
          <button onClick={addQuestionToBackend} className=""><PlusCircle
            size={30}
            color="#ffffff"
          /></button>
        </div>):(
          <div className="text-red-600 text-xl mt-2 text-center">You cannot add more than 5 questions</div>
        )}
    </div>
  )
}

export default AITestCreation