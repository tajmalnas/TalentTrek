import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import JobPostCard from "./JobPostCard";
import { Button } from "./ui/button";
import { File } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

import ExcelToJsonForm from "./ExcelToJsonForm";
import { useLocation } from "react-router-dom";

const ViewJobPosts = () => {
  const user = useSelector((state) => state.user);
  const creatorId = user?.currentUser?.user?._id;
  const [recruiterJobs, setRecruiterJobs] = useState([]);
  // console.log(creatorId);
  const location = useLocation();
  // const token = localStorage.getItem('token');
  // console.log(token);
  const fetchRecruiterPosts = async (creatorId) => {
    const response = await axios.get(`/job/getJobPosts/${creatorId}`);
    // console.log(response.data.jobPosts);
    // const recruiterJobs = response?.data?.jobPosts;
    // console.log(recruiterJobs);
    // const {recruiterJobs} = response?.data?.jobPosts;
    setRecruiterJobs(response?.data?.jobPosts);
    // console.log(recruiterJobs);
  };
  useEffect(() => {
    fetchRecruiterPosts(creatorId);
    // console.log(creatorId);
  }, [location]);

  return (
    <div className="p-5 w-full">
      <div className="flex w-full items-center justify-between mb-10 text-slate-200">
        <h1 className="text-3xl tracking-wide font-medium">Jobs Posted</h1>

        <Dialog>
          <DialogTrigger>
            <Button className="flex gap-2 text-sm bg-emerald-500 hover:bg-emerald-600">
              <File size={20} />
              Upload Shortlisted Candidates
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-[#2d2f40] text-slate-200">
            <ExcelToJsonForm />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-2 gap-10 justify-center item-center">
        {recruiterJobs.length ? (
          recruiterJobs.map((job) => <JobPostCard key={job._id} job={job} />)
        ) : (
          <div className="text-white">No Jobs Posted</div>
        )}
      </div>
    </div>
  );
};

export default ViewJobPosts;
