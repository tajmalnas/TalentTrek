import React, { useEffect, useState } from "react";
import { Label } from "../components/AceComps/Label";
import { Input } from "../components/AceComps/Input";
import { twMerge } from "tailwind-merge";
import clsx from "clsx"; // Import the entire clsx module
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { toast } from "react-toastify";
import TemplateCard from "@/components/TemplateCard";

export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}

const TemplatePage = () => {
  const [role, setRole] = useState("");
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState([]);
  const [myTemplates, setMyTemplates] = useState([])

  const submitTemplate = async(e) => {
    e.preventDefault();
    console.log(role);
    console.log(questions);

   const response = await axios.post('/template/create', {
      token : localStorage.getItem('token'),
      role : role,
      questions : questions
   })
   console.log(response.data.message);
   if(response.data.status === 201)
   {  
      toast.success(response.data.message);
      setQuestions([]);
      fetchMyTemplates(localStorage.getItem('token'))
      setRole("");
   }else {
    toast.error(response.data.message);
   }
  };

  const handleChange = (e) => {
    setRole(e.target.value);
  };

  const AddNewQuestion = (e) => {
    e.preventDefault();
    if (question.trim() !== "") {
      setQuestions(prevQuestions => [...prevQuestions, question.trim()]);
      setQuestion(""); // Clear the question input after adding to the array
    }
  };
  const RemoveLastQuestion = (e) => {
    e.preventDefault();
    if (questions.length > 0) {
      setQuestions(prevQuestions => prevQuestions.slice(0, -1)); // Remove the last question from the array
    }
  };
  const fetchMyTemplates = async(token) => {
    const response = await axios.post('/template/getTemplates', {token});
    console.log("My Templates are : ", response.data.templates);
    setMyTemplates(response.data.templates)
  }
  useEffect(() => {
    const token = localStorage.getItem('token');
    fetchMyTemplates(token);
  }, [])
  

  return (
    <div className="p-10 w-full min-h-screen flex flex-col">
      <div className="p-10 w-full h-screen flex flex-col gap-5">
      <div className="h-[8vh] w-100% flex">
        <h1 className="text-3xl tracking-wider font-medium text-white">
          Create Interview Templates
        </h1>
      </div>
      <div className=" w-full flex flex-row gap-7">
        <div className="flex flex-col gap-10 w-1/2">
          <form className="mt-6 flex flex-col gap-6">
            <LabelInputContainer className="w-3/4 flex flex-col ">
              <Label className="font-medium text-lg tracking-wide mb-4">
                Job Role
              </Label>
              <Input
                name="role"
                placeholder="Backend Developer"
                value={role}
                onChange={handleChange}
              />
            </LabelInputContainer>
            <Label className="font-medium text-lg tracking-wide mb-1">
              Questions
            </Label>
            <div className=" flex flex-col gap-6 w-3/4">
              <Input
                name="questions"
                placeholder="What do you know about Nodejs"
                value={question}
                onChange = {(e) => setQuestion(e.target.value)}
              />
              <div className="flex justify-between w-full">
              <Button
                className=" min-w-[6vh] h-[6vh] tracking-wider"
                onClick={AddNewQuestion}
              >
                Add
              </Button>
              <Button
                className=" min-w-[6vh] h-[6vh] tracking-wider"
                onClick={RemoveLastQuestion}
              >
                Remove
              </Button>
              </div>
            </div>
          </form>
          <Button
            onClick={submitTemplate}
            className=" w-3/4 h-[6vh] text-lg tracking-wide"
          >
            Create Template
          </Button>
        </div>
        <div className="text-white w-1/2 bg-[#0f172a] p-6 rounded-lg h-[57vh]">
          <LabelInputContainer className="w-3/4 flex flex-col ">
            <Label className="font-medium text-lg tracking-wide mb-7">
              Template Review
            </Label>
          </LabelInputContainer>
          <div className="w-full flex-col gap-6">
            <div className="mb-6 tracking-wider">{role}</div>
            <div className="">
            
                {
                  questions.length >= 1 && questions.map((que) => (
                    <div className="mb-1 tracking-wider">{que}</div>
                  ))
                }
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className="min-h-screen w-full">
        <div className="text-3xl tracking-wider font-medium text-white mb-10"><h1>Saved Templates</h1></div>
        <div className="grid grid-cols-2 gap-10 justify-center item-center">
        {myTemplates.length ? (
          myTemplates.map((template) => <TemplateCard key={template._id} template={template} />)
        ) : (
          <div className="text-white">You have no existing templates</div>
        )}
      </div>
      </div>
    </div>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default TemplatePage;
