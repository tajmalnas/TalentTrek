import React from "react";
import { Link } from "react-router-dom";
import dsaImg from "./images/DSA_image.jpg";
import frontendImg from "./images/Frontend-interview.png";
import backendImg from "./images/backend-interview.png";

("use client");
import { CardBody, CardContainer, CardItem } from "./3dCard";

const StartPage = () => {
  return (
    <div className="text-white w-full text-center p-5">
      <div className="font-black tracking-wider text-center text-4xl h-[12vh] w-full bg-[#191b2e] rounded-xl p-5">
        Prepare for Interviews
      </div>

      <div className="gap-4 grid grid-cols-3 mt-5">
        <Card title="DSA" category="dsa" image={dsaImg} />
        <Card title="Frontend" category="frontend" image={frontendImg} />
        <Card title="Backend" category="backend" image={backendImg} />
      </div>
    </div>
  );
};

const Card = ({ title, category, image }) => {
  return (
    <Link to={`/ai-interview/${category}`} className="cursor-pointer">
      <CardContainer className="inter-var w-full">
        <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-slate-900 dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            {title}
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
          >
            Click to start the {title} interview
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4">
            <img
              src={image}
              height="1000"
              width="1000"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
        </CardBody>
      </CardContainer>
    </Link>
  );
};

export default StartPage;
