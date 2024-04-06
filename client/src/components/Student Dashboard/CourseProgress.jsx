import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CourseProgress = ({ courseName, val }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <CircularProgressbar className="w-40" value={val} text={`${val}%`} />
      <p className="font-bold tracking-wide rounded-xl p-2 max-w-40 text-sm bg-[#2d2f40]">
        {courseName}
      </p>
    </div>
  );
};

export default CourseProgress;
