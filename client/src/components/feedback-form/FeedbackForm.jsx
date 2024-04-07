import { Radio } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Star } from 'lucide-react';

const FeedbackForm = () => {
  const [contentQuality, setContentQuality] = useState(0);
  const [relevance, setRelevance] = useState(0);
  const [engagement, setEngagement] = useState(0);
  const [instructorQuality, setInstructorQuality] = useState(0);
  const [courseMaterials, setCourseMaterials] = useState(0);

  const handleSubmit = () => {
    console.log(contentQuality, relevance, engagement, instructorQuality, courseMaterials);
    const totalRating = (contentQuality + relevance + engagement + instructorQuality + courseMaterials) / 5;    
    console.log(totalRating);
  }

  const handleClear = () => {  
    setContentQuality(0);
    setRelevance(0);
    setEngagement(0);
    setInstructorQuality(0);
    setCourseMaterials(0);
  }

  return (
    <div className="w-full flex flex-col gap-5 min-h-screen bg-[#191b2e]">
      <div className="w-[80%] h-[20vh] flex flex-col gap-2">
        <div className="">
          <b>Content Quality : </b>How well the course content is structured,
          explained and presented?
        </div>
        <div className="flex gap-10">
          <input type="radio" onClick={() => setContentQuality(1)} /><Star color="#ffc629" strokeWidth={3} />
          <input type="radio" onClick={() => setContentQuality(2)} />2
          <input type="radio" onClick={() => setContentQuality(3)} />3
          <input type="radio" onClick={() => setContentQuality(4)} />4
          <input type="radio" onClick={() => setContentQuality(5)} />5
        </div>
      </div>
      <div className="w-[80%] h-[20vh] flex flex-col gap-2">
        <div className="">
          <b>Relevance : </b>The degree to which the course material aligned
          your expectations and needs
        </div>
        <div className="flex gap-10">
          <input type="radio" onClick={() => setRelevance(1)} />1
          <input type="radio" onClick={() => setRelevance(2)} />2
          <input type="radio" onClick={() => setRelevance(3)} />3
          <input type="radio" onClick={() => setRelevance(4)} />4
          <input type="radio" onClick={() => setRelevance(5)} />5
        </div>
      </div>
      <div className="w-[80%] h-[20vh] flex flex-col gap-2">
        <div className="">
          <b>Engagement : </b>How engaging and interactive was the course? Did
          it include exercises, practical examples?
        </div>
        <div className="flex gap-10">
          <input type="radio" onClick={() => setEngagement(1)} />1
          <input type="radio" onClick={() => setEngagement(2)} />2
          <input type="radio" onClick={() => setEngagement(3)} />3
          <input type="radio" onClick={() => setEngagement(4)} />4
          <input type="radio" onClick={() => setEngagement(5)} />5
        </div>
      </div>
      <div className="w-[80%] h-[20vh] flex flex-col gap-2">
        <div className="">
          <b>Instructor Quality : </b> Feedback on the instructor's teaching
          style, expertise, responsiveness to questions, and overall
          effectiveness.
        </div>
        <div className="flex gap-10">
          <input type="radio" onClick={() => setInstructorQuality(1)} />1
          <input type="radio" onClick={() => setInstructorQuality(2)} />2
          <input type="radio" onClick={() => setInstructorQuality(3)} />3
          <input type="radio" onClick={() => setInstructorQuality(4)} />4
          <input type="radio" onClick={() => setInstructorQuality(5)} />5
        </div>
      </div>
      <div className="w-[80%] h-[20vh] flex flex-col gap-2">
        <div className="">
          <b>Course Materials : </b>The quality and usefulness of supplementary
          materials such as slides, videos, code samples.
        </div>
        <div className="flex gap-10">
          <input type="radio" onClick={() => setCourseMaterials(1)} />1
          <input type="radio" onClick={() => setCourseMaterials(2)} />2
          <input type="radio" onClick={() => setCourseMaterials(3)} />3
          <input type="radio" onClick={() => setCourseMaterials(4)} />4
          <input type="radio" onClick={() => setCourseMaterials(5)} />5
        </div>
      </div>

      <Button className="w-[20%]" onClick = {handleSubmit}>Submit</Button>
      <Button className="w-[20%]" onClick = {handleClear}>Clear</Button>
    </div>
  );
};

export default FeedbackForm;
