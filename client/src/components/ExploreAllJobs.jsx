import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import JobApplyCard from "./JobApplyCard";
import { Button } from "./ui/button";

const ExploreAllJobs = () => {
  const [skillsData, setSkillsData] = useState(["java", "c++"]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post("/profile", {
        token: localStorage.getItem("token"),
      });
      console.log("profile data", response);
      setSkillsData(response?.data);
    };
    fetchData();
  }, []);

  // console.log(skillsData);
  const [showAll, setShowAll] = useState(true);

  const [recommendedJobs, setRecommendedJobs] = useState([]);

  const [allJobs, setAllJobs] = useState([]);

  const location = useLocation();

  const fetchRecruiterPosts = async (req, res) => {
    console.log(skillsData);
    const response = await axios.get(
      `/job/getAllJobPosts?skills=${skillsData}`
    );
    console.log("recommended", response?.data?.recommended);

    const similarJobs = response?.data?.recommended?.filter(
      (item) => item.similarity > 0
    );

    setAllJobs(response?.data?.recommended?.map((item) => item.job));

    setRecommendedJobs(similarJobs.map((item) => item.job));
  };
  useEffect(() => {
    fetchRecruiterPosts();
  }, [location]);

  return (
    <div className="text-slate-200 w-full">
      {" "}
      <div className="p-10 ">
        <div className="flex items-center justify-between mb-10 text-slate-200">
          <h1 className="text-3xl tracking-wide font-medium">Explore Jobs</h1>
        </div>
        <div className="flex gap-6 mt-8">
          <Button
            className={`font-semibold hover:bg-white hover:text-slate-800 ${
              showAll && "bg-white text-slate-800"
            }`}
            onClick={() => setShowAll(true)}
          >
            All
          </Button>
          <Button
            className={`font-semibold hover:bg-white hover:text-slate-800 ${
              !showAll && "bg-white text-slate-800"
            }`}
            onClick={() => setShowAll(false)}
          >
            {" "}
            Recommended
          </Button>
        </div>
        {showAll ? (
          <div className="mt-8 grid grid-cols-2 gap-10 justify-center item-center">
            {allJobs?.length ? (
              allJobs.map((job) => <JobApplyCard key={job._id} job={job} />)
            ) : (
              <div className="">No Jobs Posted</div>
            )}
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-10 justify-center item-center">
            {recommendedJobs?.length ? (
              recommendedJobs.map((job) => (
                <JobApplyCard key={job._id} job={job} />
              ))
            ) : (
              <div className="">No Jobs Posted</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreAllJobs;
