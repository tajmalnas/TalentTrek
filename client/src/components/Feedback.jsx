/* eslint-disable react/prop-types */
import { useState } from "react";
import { Input } from "./AceComps/Input";
import { Label } from "./AceComps/Label";
import { Button } from "./ui/button";
import clsx from "clsx"; // Import the entire clsx module
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}

const Feedback = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`/feedback/`, {
        userId: "sjdahdb23812938120938wj",
        name,
        email,
        message,
      })
      .then((res) => {
        console.log(res);
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-white">
        Feedback Form About Candidate
      </h1>
      <form
        className="flex flex-col gap-6 bg-gray-900 rounded-md p-8 mt-8"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-6 justify-between">
          <LabelInputContainer className="w-1/2 flex flex-col ">
            <Label className="font-medium text-base">Name</Label>
            <Input
              name="companyName"
              onChange={(e) => setName(e.target.value)}
              placeholder="XYZ"
            />
          </LabelInputContainer>
          <LabelInputContainer className="w-1/2 flex flex-col ">
            <Label className="font-medium text-base">Email</Label>
            <Input
              name="location"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="India"
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="flex flex-col">
          <Label className="font-medium text-base">Candidate Feedback</Label>
          <textarea
            className="h-32 text-white bg-[#27272a] p-4 justify-start items-start"
            name="jobDesc"
            placeholder="The candidate should need to focus more on DSA and try to get core knowledge too"
            onChange={(e) => setMessage(e.target.value)}
          />
        </LabelInputContainer>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="px-4 h-9 font-medium bg-indigo-500 hover:bg-indigo-600 hover:scale-105 mt-4"
          >
            Create Job Opening
          </Button>
        </div>
      </form>
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

export default Feedback;
