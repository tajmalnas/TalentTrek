import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import myPic from "../../assets/myPic.jpeg";

const TopRatedStudents = () => {
  return (
    <div className="w-full text-slate-200 p-5">
      <div className="rounded-xl text-white text-3xl text-center font-black tracking-wider bg-[#191b2e] p-4">
        Top Rated Students
      </div>
      <div className="flex  items-center mt-14">
        <div className="font-medium tracking-wide pr-4 text-lg">
          Filter by domain:{" "}
        </div>
        <Select>
          <SelectTrigger className="bg-[#191b2e] w-[180px]">
            <SelectValue placeholder="Select domain" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Web Development">Web Development</SelectItem>
            <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
            <SelectItem value="App Development">App Development</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-[#191b2e] rounded-xl mt-10">
        <Table>
          <TableCaption>A list of top rated students.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Profile</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>View Profile</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                {" "}
                <img
                  src={myPic}
                  alt="profile"
                  className="h-10 w-10 rounded-full object-cover"
                />
              </TableCell>
              <TableCell>Rohan Ramidwar</TableCell>
              <TableCell>1789</TableCell>
              <TableCell>rohan.biz21@gmail.com</TableCell>
              <TableCell>9067919542</TableCell>
              <TableCell>
                <button className="bg-blue-500  text-slate-200 p-2 rounded-md">
                  View Profile
                </button>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                {" "}
                <img
                  src={myPic}
                  alt="profile"
                  className="h-10 w-10 rounded-full object-cover"
                />
              </TableCell>
              <TableCell>Rohan Ramidwar</TableCell>
              <TableCell>1789</TableCell>
              <TableCell>rohan.biz21@gmail.com</TableCell>
              <TableCell>9067919542</TableCell>
              <TableCell>
                <button className="bg-blue-500  text-slate-200 p-2 rounded-md">
                  View Profile
                </button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TopRatedStudents;
