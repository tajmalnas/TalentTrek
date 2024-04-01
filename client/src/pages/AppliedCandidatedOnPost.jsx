import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AppliedCandidatedOnPost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [appliedCandidates, setAppliedCandidates] = useState([]);


  const takeMeeting = async (candidate) => {
    await axios.post("/send-emails/interview",{
      candidateEmail: candidate?.email,
      candidateId: candidate?._id,
      token:localStorage.getItem("token")
    })
    navigate(`/meeting/${candidate?.candidate?._id}`)
  }

  const fetchData = async () => {
    const postId = location.pathname.split("/")[3];
    console.log(postId);
    axios
      .post("/job/allCandidatesApplied", { postId })
      .then((res) => {
        console.log(res.data);
        setAppliedCandidates(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full text-slate-200 p-5">
      <h1 className="text-white text-xl text-center">
        Applicants for this post
      </h1>
      <Table>
        <TableCaption>A list of shortlisted candidats.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Profile</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Marks</TableHead>
            <TableHead>Personal Interview</TableHead>
            <TableHead>View Profile</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appliedCandidates.length > 0 &&
            appliedCandidates.map((candidate, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <img
                      src={candidate?.candidate?.profilePicture}
                      alt="profile"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </TableCell>
                  <TableCell>{candidate?.candidate?.firstName}</TableCell>
                  <TableCell>{candidate?.candidate?.email}</TableCell>
                  <TableCell>{candidate?.candidate?.contact}</TableCell>
                  <TableCell>{candidate?.marks}</TableCell>
                  <TableCell>
                    <button
                      className="bg-sky-600  text-slate-200 p-2 rounded-md"
                      onClick={() =>takeMeeting(candidate?.candidate)}
                    >
                      Take Interview
                    </button>
                  </TableCell>
                  <TableCell>
                    <button
                      className="bg-blue-500  text-slate-200 p-2 rounded-md"
                      onClick={() =>
                        navigate(`/profile/${candidate?.candidate?._id}`)
                      }
                    >
                      View Profile
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedCandidatedOnPost;
