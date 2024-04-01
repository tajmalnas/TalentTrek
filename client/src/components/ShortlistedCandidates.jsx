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
import axios from "axios";
import { toast } from "react-toastify";

const ShortlistedCandidates = () => {
  const location = useLocation();

  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("shortlist"))
  );
  const token = localStorage.getItem("token");

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("shortlist")));
  }, [location]);

  const sendEmails = async () => {
    const emails = data?.excelData.map((excel) => excel?.email);
    console.log(emails);
    const response = await axios.post("/send-emails", { emails, token });
    console.log(response.data);
    if (response.data.status === 200) {
      toast.success(response.data.msg);
    } else {
      toast.error(response.data.msg);
    }
  };
  return (
    <div className="text-slate-200 w-full p-5">
      <h1 className="text-3xl tracking-wide font-bold mb-10">
        Shortlisted Candidates
      </h1>

      <Table>
        <TableCaption>A list of shortlisted candidates.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Skills</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Education</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.excelData.map((excel) => (
            <TableRow>
              <TableCell>{excel?.name}</TableCell>
              <TableCell>{excel?.email}</TableCell>
              <TableCell>{excel?.contact}</TableCell>
              <TableCell>{excel?.skills}</TableCell>
              <TableCell>{excel?.experience}</TableCell>
              <TableCell>{excel?.education}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button
        className="bg-emerald-500 hover:bg-emerald-600 text-white mt-7 tracking-wider"
        onClick={sendEmails}
      >
        Send Confirmation Emails
      </Button>
    </div>
  );
};

export default ShortlistedCandidates;
