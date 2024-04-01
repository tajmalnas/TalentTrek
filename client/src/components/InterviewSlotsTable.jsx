import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";

const InterviewSlotsTable = () => {
  const location = useLocation();

  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("interviewSlots"))
  );
  console.log(data.response.data.length);
  console.log(data?.response?.data);
  useEffect(() => {
    // console.log(data?.response?.data);
    setData(JSON.parse(localStorage.getItem("interviewSlots")));
  }, [location]);

  return (
    <div className="w-full text-slate-200 p-5">
      <h1 className="text-3xl tracking-wider font-bold mb-10">
        Shortlisted Candidates
      </h1>
      <Table>
        <TableCaption>A list of shortlisted candidates.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Candidate</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Start time</TableHead>
            <TableHead>End time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {data?.response?.data?.map((data) => (
            <TableRow key={data.id}>
                <TableCell>{data?.candidate}</TableCell>
                <TableCell>{data?.email}</TableCell>
                <TableCell>{data?.date}</TableCell>
                <TableCell>{data?.startTime}</TableCell>
                <TableCell>{data?.endTime}</TableCell>
            </TableRow>
        ))}
        </TableBody>
      </Table>

      <Button className="mt-6 tracking-wider bg-green-700"
        onClick={() => {
          console.log("Sending confirmation email");
        }}
      >
        Send Confirmation Email
      </Button>
    </div>
  );
};

export default InterviewSlotsTable;
