import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const MyAppliedJobs = () => {
  const user = useSelector((state) => state?.user);
  const userId = user?.currentUser?.user?._id;

  const navigate = useNavigate();
  const location = useLocation();
  const [myAppliedJobs, setMyAppliedJobs] = useState([]);

  const fetchMyAppliedJobs = async () => {
    const response = await axios.get(
      `/candidate/job/getMyAppliedJobs?userId=${userId}`
    );
    console.log(response?.data);
    setMyAppliedJobs(response?.data);
  };

  useEffect(() => {
    fetchMyAppliedJobs();
  }, [location]);

  return (
    <div className="w-full text-slate-50 p-10">
      <h1 className="text-3xl tracking-wide font-bold mb-10">
        My applied jobs
      </h1>

      <Table className="bg-[#191b2e] ">
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow className="hover:bg-[#2d2f40]">
            <TableHead>Role</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Job Description</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Round 1</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {myAppliedJobs.map((data) => (
            <TableRow className="hover:bg-[#2d2f40]" key={data?._id}>
              <TableCell>{data?.role}</TableCell>
              <TableCell>{data?.companyName}</TableCell>
              <TableCell className="w-60">{data?.jobDesc}</TableCell>
              <TableCell>{data?.jobLocation}</TableCell>
              <TableCell>
                <button
                  onClick={() => navigate(`/ai-interview/${data?.post}`)}
                  className="bg-indigo-800 hover:bg-indigo-900 px-4 h-9 rounded-md"
                >
                  Ai interview
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyAppliedJobs;
