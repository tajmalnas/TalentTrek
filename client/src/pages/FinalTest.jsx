/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { PlusCircle,Trash2  } from "lucide-react";
import axios from 'axios'

const FinalTest = ({courseId}) => {
    
    const [data, setData] = useState([])
    const [showAddQuestion, setShowAddQuestion] = useState(false)
    const [inputQuestion,setInputQuestion] = useState("");
    const [options, setOptions] = useState([
        "A","B","C","D"
    ])
    const [optionA, setOptionA] = useState("")
    const [optionB, setOptionB] = useState("")
    const [optionC, setOptionC] = useState("")
    const [optionD, setOptionD] = useState("");
    const [correctOption, setCorrectOption] = useState("")
    

    const fetchQuestions = async() => {
        try{
            axios.post('/course/get-final-questions', {
                courseId
            }).then((res) => {
                console.log("response",res)
                setData(res.data);
            }).catch((err) => {
                console.log(err.response);
            });
        }catch(err){
            console.log(err.message);
        }
    }

    const addQuestionToBackend = async() =>{
        if(inputQuestion==="" || optionA==="" || optionB==="" || optionC==="" || optionD==="" || correctOption===""){
            alert("Enter valid input")
            console.log("inputQuestion",inputQuestion)
            console.log("optionA",optionA)
            console.log("optionB",optionB)
            console.log("optionC",optionC)
            console.log("optionD",optionD)
            console.log("correctOption",correctOption)
            return;
        }
        console.log("inputQuestion",inputQuestion)
        console.log("optionA",optionA)
        console.log("optionB",optionB)
        console.log("optionC",optionC)
        console.log("optionD",optionD)
        console.log("correctOption",correctOption)
        axios.post('/course/add-final-questions', {
            courseId,
            inputQuestion,
            optionA,
            optionB,
            optionC,
            optionD,
            correctOption
        }).then(()=>{
            fetchQuestions();
        }).catch((err)=>{
            console.log(err.message);
        })
    }

    useEffect(()=>{
        fetchQuestions();
    },[])

    return (
    <div className="text-white w-full">
        <div className="text-2xl w-full mt-2">Rules to create Final MCQ Test</div>
        <div className="text-gray-200 p-2">1) You cannot add more than 25 (five) Questions in one MCQ Test (As of now it is in Beta Phase Adding more questions will be available in next version)</div>
        <div className="text-gray-200 p-2">2) Design question in such manner that student can answer in 30 seconds</div>
        <div>
          {data.length > 0 ? data.map((question, index) => {
            return(
              <div key={index} className="bg-gray-800 p-8 flex justify-between mb-2 rounded-lg mt-4">
                <div className='flex flex-col'>
                <div className="text-lg font-semibold">{index+1}. {question.question}</div>
                <ul>
                    <li className={("A"===question.correctOption)?"text-green-500":"text-white"}>A. {question.options[0]}</li>
                    <li className={("B"===question.correctOption)?"text-green-500":"text-white"}>B. {question.options[1]}</li>
                    <li className={("C"===question.correctOption)?"text-green-500":"text-white"}>C. {question.options[2]}</li>
                    <li className={("D"===question.correctOption)?"text-green-500":"text-white"}>D. {question.options[3]}</li>
                </ul>
                </div>
                <Trash2 
                  stroke={"red"}
                />
              </div>
            )})
            :
            <div className="text-xl text-center mt-4">No Questions Available</div>
          }
        </div>
        <div className='flex justify-center items-center mb-4'>
        <button className="text-xl mt-2 px-2 py-1 rounded-md bg-blue-800 block" onClick={()=>setShowAddQuestion(!showAddQuestion)}>Add Question</button>
        </div>
        {data.length<25 ? (showAddQuestion && <div className='flex justify-center items-center'><div className="flex bg-[#191b2e] p-8 w-2/3 flex-col gap-4">
          <div>
          <label className="text-white text-xl ">Enter Question</label>
          <input onChange={e=>setInputQuestion(e.target.value)} value={inputQuestion} type="text" className="w-full mt-2 p-2 bg-transparent border rounded-md" placeholder="Enter Question"/>
          </div>
          <div>
            <label className="text-white text-xl ">Enter Options</label>
            <div>A. <input onChange={e=>setOptionA(e.target.value)} value={optionA} type="text" className="w-2/3 mt-2 p-2 bg-transparent border rounded-md" placeholder="Enter Options"/></div>
            <div>B. <input onChange={e=>setOptionB(e.target.value)} value={optionB} type="text" className="w-2/3 mt-2 p-2 bg-transparent border rounded-md" placeholder="Enter Options"/></div>
            <div>C. <input onChange={e=>setOptionC(e.target.value)} value={optionC} type="text" className="w-2/3 mt-2 p-2 bg-transparent border rounded-md" placeholder="Enter Options"/></div>
            <div>D. <input onChange={e=>setOptionD(e.target.value)} value={optionD} type="text" className="w-2/3 mt-2 p-2 bg-transparent border rounded-md" placeholder="Enter Options"/></div>
          </div>
            <div>
                Correct Option : <select onChange={e=>setCorrectOption(e.target.value)} value={correctOption} className="w-1/3 mt-2 p-2 bg-gray-300 text-black border rounded-md">
                    {options.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </select>
            </div>
          <button onClick={addQuestionToBackend} className="flex w-40 p-1 rounded-md justify-between px-3 items-center bg-blue-900">
          Add The MCQ
          <PlusCircle
            size={30}
            color="#ffffff"
          /></button>
        </div></div>):(
          <div className="text-red-600 text-xl mt-2 text-center">You cannot add more than 25 questions</div>
        )}
    </div>
  )
}

export default FinalTest