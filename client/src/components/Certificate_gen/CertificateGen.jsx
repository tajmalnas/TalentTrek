import React, { useCallback, useRef } from "react";
import { toPng } from "html-to-image";
import Template from "../../assets/template.jpg";

const CertificateGen = () => {
  const ref = useRef(null);

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "certificate.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  const course = "The Web Development Course";
  const instructor = "Angela Yu";
  const student = "Taj Malnas";
  return (
    <div className="flex flex-col items-center mt-20">
      <button
        className="px-4 h-9 bg-indigo-600 font-medium rounded-xl text-lg text-white"
        onClick={onButtonClick}
      >
        Download
      </button>
      <div
        className="relative p-4 flex
font-sans text-gray-800"
        ref={ref}
      >
        <img src={Template} alt="" />
        <p className="absolute top-20 left-20 text-3xl font-black">Udemy</p>
        <p className="absolute top-64 left-20 font-serif font-black text-5xl">
          {course}
        </p>
        <p className="absolute left-[166px] bottom-[316px] font-bold text-lg">
          {instructor}
        </p>
        <p className="absolute left-20 bottom-[124px] font-bold text-3xl">
          {student}
        </p>
        <p className="absolute left-[128px] bottom-[91px] ">7 April, 2024</p>
        <p className="absolute left-[140px] bottom-[65px]">17.5 total hours</p>
      </div>
    </div>
  );
};

export default CertificateGen;
