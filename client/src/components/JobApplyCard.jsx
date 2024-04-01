import axios from "axios";
import { Users } from "lucide-react";
import React, { useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

//we will have the post props
const ExploreAllJobs = ({ job }) => {
  const user = useSelector((state) => state?.user);
  const userId = user?.currentUser?.user?._id;
  const [view, setView] = useState(false);
  const viewMore = () => {
    setView(!view);
  };

  const postId = job?._id;
  const companyName = job?.companyName;
  const jobLocation = job?.location;
  const jobDesc = job?.jobDesc;
  const role = job?.role;

  const addCandidate = async () => {
    const response = await axios.post("/job/addCandidate", {
      postId,
      userId,
      companyName,
      jobLocation,
      jobDesc,
      role,
    });
    if(response.status === 201){
      toast.success("Applied successfully");
    }
    else{
      toast.error("Failed to apply");
    }
    console.log(response);
  };

  return (
    <div className="transition-all p-6 bg-[#191b2e] border border-[#2d2f40] text-slate-300 rounded-xl">
      <p className="text-sm italic text-end">
        {moment(job?.createdAt)?.fromNow()}
      </p>
      <div className="flex flex-col">
        <div>
          <h1 className="text-sky-600 underline  tracking-wide text-2xl font-bold">
            {role}
          </h1>
          <p className="mt-1">{companyName}</p>
          <p className="text-sm">{jobLocation}</p>
        </div>

        <div className="flex mt-6">
          <div className="px-2 py-1 rounded-md bg-gray-500/80 font-medium">
            Full Time
          </div>
        </div>

        <div className="mt-6">
          <p className="font-medium">Skill Requirements</p>
          <div className="text-sm p-3 rounded-xl bg-[#2d2f40] mt-2">
            <p className="text-justify text-sm">{job?.skillReq}</p>
          </div>
        </div>

        {view && (
          <div className="mt-6">
            <p className="font-medium">Job Description</p>
            <div className="p-3 rounded-xl bg-[#2d2f40] mt-2">
              <p className="text-justify text-sm">{jobDesc}</p>
            </div>
          </div>
        )}

        {view && (
          <div className="mt-6">
            <p className="font-medium">Comapany Description</p>
            <div className="p-3 rounded-xl bg-[#2d2f40] mt-2">
              <p className="text-justify text-sm">{job?.companyDesc}</p>
            </div>
          </div>
        )}

        <div className="flex justify-end mt-2">
          <div
            role="button"
            onClick={viewMore}
            className="px-2 py-1 text-sm rounded-md font-medium bg-gray-800"
          >
            {view ? "View less.." : "View more.."}
          </div>
        </div>
        <div className="flex justify-between items-center mt-6">
          <div className="flex gap-2 tracking-wide font-medium p-2 text-sm rounded-xl rounded-bl-none text-emerald-300/80 text-slate-100">
            <Users size={20} /> {job?.noOfCandidates?.length || 0} Applicants
          </div>

          <div
            onClick={addCandidate}
            role="button"
            className="p-2 flex gap-2 font-medium text-slate-50 tracking-wide bg-sky-500 hover:bg-sky-600 rounded-xl rounded-br-none"
          >
            Apply
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreAllJobs;
