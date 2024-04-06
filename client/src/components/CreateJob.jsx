import { useState } from "react";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Label } from "../components/AceComps/Label";
import { Input } from "../components/AceComps/Input";
import clsx from "clsx"; // Import the entire clsx module
import { twMerge } from "tailwind-merge";
import { Edit } from "lucide-react";

export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}

const JobOpeningForm = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  // console.log(user?.currentUser?.user?._id);
  const creatorId = user?.currentUser?.user?._id;
  console.log(creatorId);
  const [jobData, setJobData] = useState({
    creator: creatorId,
    role: "",
    location: "",
    companyName: "",
    companyDesc: "",
    skillReq: "",
    exp: "",
    jobDesc: "",
  });
  const handleClear = () => {
    setJobData({
      role: "",
      location: "",
      companyName: "",
      companyDesc: "",
      skillReq: "",
      exp: "",
      jobDesc: "",
    });
  };
  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setJobData({ ...jobData, creator: creatorId });
    console.log("creator ID", creatorId);
    const response = await axios.post("/job/createJob", jobData);
    console.log(response.data.msg);
    toast.success(`${response.data.msg}`);
    navigate("/viewJobPosts");
  };
  return (
    <div className="w-full p-5 flex flex-col text-slate-200 justify-center items-center">
      <div
        className="w-full text-slate-100 rounded-xl p-4   bg-[#191b2e]

"
      >
        <div className="flex gap-4 items-center  mb-8">
          <Edit size={28} />
          <h1 className="text-2xl text-slate-200 tracking-wide font-medium">
            Create Job Opening
          </h1>
        </div>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex gap-6 justify-between">
            <LabelInputContainer className="w-1/2 flex flex-col ">
              <Label className="font-medium text-base"> Company Name</Label>
              <Input
                name="companyName"
                onChange={handleChange}
                placeholder="XYZ"
              />
            </LabelInputContainer>
            <LabelInputContainer className="w-1/2 flex flex-col ">
              <Label className="font-medium text-base"> Location</Label>
              <Input
                name="location"
                onChange={handleChange}
                placeholder="India"
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="flex flex-col">
            <Label className="font-medium text-base">
              {" "}
              Company Description
            </Label>

            <Input
              name="companyDesc"
              placeholder="Company Description"
              onChange={handleChange}
            />
          </LabelInputContainer>

          <div className="flex gap-6 justify-between">
            <LabelInputContainer className="w-1/2 flex flex-col ">
              <Label className="font-medium text-base"> Role</Label>
              <Input
                name="role"
                onChange={handleChange}
                placeholder="Full stack developer"
              />
            </LabelInputContainer>
            <LabelInputContainer className="w-1/2 flex flex-col ">
              <Label className="font-medium text-base">
                {" "}
                Experience Required (in years)
              </Label>
              <Input
                name="exp"
                onChange={handleChange}
                type="number"
                placeholder="5"
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="flex flex-col">
            <Label className="font-medium text-base"> Skill Requirements</Label>
            <Input
              name="skillReq"
              onChange={handleChange}
              placeholder="React, Tailwind"
            />
          </LabelInputContainer>

          <LabelInputContainer className="flex flex-col">
            <Label className="font-medium text-base"> Job Description</Label>
            <Input
              name="jobDesc"
              placeholder="Job Description"
              onChange={handleChange}
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
      </div>{" "}
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

export default JobOpeningForm;
