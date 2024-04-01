/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { Timer, Users } from "lucide-react";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import DatePicker, { DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { Button } from "./ui/button";
import axios from "axios";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
//we will have the post props
const JobOpeningCard = ({ job }) => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(job);
  const skills = [
    "Proficiency in Python, Java, or similar programming languages",
    "Experience with cloud platforms such as AWS, Azure, or GCP Strong",
    "Understanding of software architecture and design principles",
  ];
  const [scheduleData, setScheduleData] = useState({
    jobId: job?._id,
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    interviewDuration: "",
    breakDuration: "",
  });

  const [view, setView] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("12:00");
  const [endTime, setEndTime] = useState("12:00");
  const [interval, setInterval] = useState("");
  const [breakDuration, setBreakDuration] = useState("");
  const [appliedCandidates, setAppliedCandidates] = useState([]);

  const fetchData = async (postId) => {
    console.log(postId);
    axios
      .post("/job/allCandidatesApplied", { postId })
      .then((res) => {
        console.log("candidates that matters", res.data);
        setAppliedCandidates(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleStartTimeChange = (newTime) => {
    setStartTime(newTime);
  };
  const handleEndTimeChange = (newTime) => {
    setEndTime(newTime);
  };
  const handleOnChange = (dates) => {
    setSelectedDates(dates);
  };
  //console.log(selectedDates.map((date) => date.format("YYYY-MM-DD")));
  const viewMore = () => {
    setView(!view);
  };

  const handleIntervalChange = (e) => {
    setInterval(e.target.value);
  };
  const handleBreakIntervalChange = (e) => {
    setBreakDuration(e.target.value);
  };
  const handleConfirm = async (e) => {
    e.preventDefault();
    const startDate = selectedDates[0].format("YYYY-MM-DD");
    const endDate = selectedDates[1].format("YYYY-MM-DD");
    // Assuming startTime and endTime are already defined and in the correct format
    // Assuming interval and breakDuration are also defined
    // Set start and end time
    setStartTime(startTime);
    setEndDate(endTime);

    // console.log(interval);
    // console.log(breakDuration);

    // Create confirmData object
    const confirmData = {
      jobId: job?._id,
      startDate: startDate,
      endDate: endDate,
      startTime: startTime,
      endTime: endTime,
      interval: interval,
      breakDuration: breakDuration,
      candidate: appliedCandidates,
      // Add other properties as needed
    };

    console.log("confirmData", confirmData);

    // Do something with confirmData, such as sending it to an API or storing it in state
    // console.log(confirmData);
    const response = await axios.post("/schedule/createSchedule", confirmData);
    localStorage.setItem("interviewSlots", JSON.stringify({ response }));

    navigate("/interview-slots");
  };

  const postApplicants = async (jobId) => {
    navigate(`/job/applicants/${jobId}`);
  };

  return (
    <div className="transition-all p-6 bg-[#191b2e] border border-[#2d2f40] text-slate-300 rounded-xl">
      <p className="text-sm italic text-end">
        {" "}
        {moment(job?.createdAt)?.fromNow()}
      </p>
      <div className="flex flex-col">
        <div>
          <h1 className="text-sky-600 underline  tracking-wide text-2xl font-bold">
            {job?.role}
          </h1>
          <p className="mt-1">{job.companyName}</p>
          <p className="text-sm">{job.location}</p>
        </div>

        <div className="flex mt-6">
          <div className="px-2 py-1 rounded-md bg-gray-500/80 font-medium">
            Full Time
          </div>
        </div>

        <div className="mt-6">
          <p className="font-medium">Skill Requirements</p>
          <div className="text-sm p-3 rounded-xl bg-[#2d2f40] mt-2">
            {/* <ul className="list-disc pl-4">
              {skills.map((skill, index) => (
                <li className="text-justify" key={index}>
                  {" "}
                  {skill}
                </li>
              ))}
            </ul> */}
            <p className="text-justify text-sm">{job?.skillReq}</p>
          </div>
        </div>

        {view && (
          <div className="mt-6">
            <p className="font-medium">Job Description</p>
            <div className="p-3 rounded-xl bg-[#2d2f40] mt-2">
              <p className="text-justify text-sm">{job?.jobDesc}</p>
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
        <div className="flex justify-between items-center mt-4">
          <div
            className="flex border border-blue-500 mr-1 hover:bg-blue-500 hover:text-white hover:cursor-pointer gap-2 tracking-wide font-medium p-2 text-sm rounded-xl rounded-bl-none text-emerald-300/80 text-slate-100"
            onClick={() => postApplicants(job?._id)}
          >
            <Users size={20} /> {job?.noOfCandidates?.length || 0} Applicants
          </div>

          <Dialog>
            <DialogTrigger>
              <div
                onClick={() => fetchData(job?._id)}
                className="p-2 flex gap-2 font-medium tracking-wide text-slate-100 text-sm border border-sky-600 hover:bg-blue-500 hover:text-white hover:cursor-pointer rounded-xl rounded-br-none"
              >
                <Timer size={20} />
                Schedule Interview
              </div>
            </DialogTrigger>

            <DialogContent className="">
              <div className="flex flex-col gap-3">
                <div className="font-medium text-lg mb-4">
                  Dear Recruiter, kindly select viable dates and timings.
                </div>
                <div className=" flex flex-col gap-1">
                  <p className="font-medium">Pick Interview Dates</p>
                  <DatePicker
                    value={selectedDates}
                    onChange={handleOnChange}
                    range
                    plugins={[<DatePanel position="left" />]}
                    highlightToday
                    style={{
                      width: "300px",
                      height: "30px",

                      borderRadius: 0,
                    }}
                  />
                </div>
                <div className="flex flex-row gap-5">
                  <div className="">
                    <p className="font-medium">Enter start time</p>
                    <TimePicker
                      onChange={handleStartTimeChange}
                      value={startTime}
                      style={{}}
                    />
                  </div>
                  <div className="">
                    <p className="font-medium">Enter end time</p>
                    <TimePicker
                      onChange={handleEndTimeChange}
                      value={endTime}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="">
                    <p className="font-medium">Enter interview duration</p>
                    <div className="flex flex-row items-center gap-2">
                      <input
                        className="bg-inherit border border-gray-400"
                        type="number"
                        style={{}}
                        onChange={handleIntervalChange}
                      />
                      <p className="text-sm">in mins</p>
                    </div>
                  </div>
                  <div className="">
                    <p className="font-medium">Enter break duration</p>
                    <div className="flex flex-row items-center gap-2">
                      <input
                        type="number"
                        className="bg-inherit border border-gray-400"
                        onChange={handleBreakIntervalChange}
                      />
                      <p className="text-sm">in mins</p>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <Button
                    className="mt-6 bg-indigo-500 hover:bg-indigo-600"
                    onClick={handleConfirm}
                  >
                    Confirm and Allot Schedules
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default JobOpeningCard;
