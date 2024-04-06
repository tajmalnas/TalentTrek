import React from "react";
import RecentActivity from "./RecentActivity";
import CourseProgress from "./CourseProgress";
import TestScoreGraph from "./TestScoreGraph";

const StudentDashboard = () => {
  return (
    <div className="w-full text-slate-200 p-5 font-sans">
      <div className="flex gap-4">
        <div className="w-1/2 bg-[#191b2e] p-4 rounded-xl">
          <TestScoreGraph />
        </div>

        <div className="w-1/2 bg-[#191b2e] p-4 rounded-xl font-bold tracking-wide text-xl">
          <div className="border-b border-[#2d2f40] pb-4 font-bold tracking-wide text-xl">
            Progress in Enrolled Courses
          </div>
          <div></div>
          <div className="pt-4 grid grid-cols-2 gap-8">
            <CourseProgress val={20} courseName={"Web dev"} />
            <CourseProgress val={30} courseName={"Cybersecurity"} />
          </div>
        </div>
      </div>

      <div className="bg-[#191b2e] p-4 rounded-xl mt-4">
        <p className="font-bold tracking-wide text-xl">Recent Activity</p>
        <div className="mt-4 flex flex-col gap-4">
          <RecentActivity />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
