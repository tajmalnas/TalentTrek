import React from "react";
import Image1 from "../assets/candidate-profile.png"
import Image2 from "../assets/excel-to-table.png"
import Image3 from "../assets/Signup-website.png"
import Image4 from "../assets/Update-profile.png"

export const LayoutGrid = () => {
  return (
    <div className="mx-auto grid max-w-4xl grid-cols-12 gap-4 mt-12 p-4">
        <div className="col-span-12 w-full rounded-3xl border border-gray-500 sm:col-span-8 h-full bg-slate-900">
            <img src={Image1} className="w-full h-full rounded-3xl"></img>
        </div>
        <div className="col-span-12 rounded-3xl border border-gray-400 bg-gray-200 h-96 sm:col-span-4 bg-slate-900">
            <img src={Image3} className="w-full h-full rounded-3xl"></img>
        </div>
        <div className="col-span-12 rounded-3xl border border-gray-500 bg-gray-200 sm:col-span-4 h-96 bg-slate-900">
            <img src={Image4} className="w-full h-full rounded-3xl"></img>
        </div>
        <div className="col-span-12 rounded-3xl w-full border border-gray-500 bg-gray-200 h-full sm:col-span-8 bg-slate-900">
          <img src={Image2} className="w-full h-full rounded-3xl"></img>
        </div>
    </div>
  );
};

