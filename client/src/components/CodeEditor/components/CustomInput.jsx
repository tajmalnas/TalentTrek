import React from "react";
import { classnames } from "../utils/general";

const CustomInput = ({ customInput, setCustomInput }) => {
  return (
    <>
      {" "}
      <textarea
        rows="5"
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder={`Custom input`}
        className={classnames(
          "text-white w-full border-2 border-black z-10 rounded-md px-4 py-2 bg-slate-800 mt-2"
        )}
      ></textarea>
    </>
  );
};

export default CustomInput;
