import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageDb } from "@/firebase/firebaseConfig";
import { v4 } from "uuid";

const Resume = ({ profile }) => {
  const [resumeData, setResumeData] = useState({
    candidateId: profile?._id,
    resume: "",
  });

  const handleResumeUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imgref = ref(imageDb, `files/${v4()}`);
      uploadBytes(imgref, selectedFile).then((value) => {
        console.log("image uploaded", value);
        getDownloadURL(value.ref).then((url) => {
          console.log("url", url);
          setResumeData({ ...resumeData, [e.target.name]: url });
        });
      });
    } else {
      console.log("no file selected");
    }
  };

  const uploadResume = async (e) => {
    e.preventDefault();
    setResumeData({ ...resumeData, candidateId: profile?._id });
    const response = await axios.post("/candidate/addResume", resumeData);
  };

  const viewResume = () => {
    window.open(profile?.resume, "_blank");
  };

  return (
    <div className="p-4 bg-[#191b2e] text-slate-100 rounded-xl">
      <p className="font-medium text-xl">Resume</p>
      {profile?.resume ? (
        <Button
          className="bg-[#2d2f40] hover:bg-[#2d2f40]/80  flex gap-2 w-full mt-8"
          onClick={viewResume}
        >
          View resume
        </Button>
      ) : (
        <Dialog>
          <DialogTrigger className="w-full">
            <Button className="bg-[#2d2f40] hover:bg-[#2d2f40]/80  flex gap-2 w-full mt-8">
              <Plus size={16} />
              Add resume
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={uploadResume} className="flex flex-col">
              <label className="mt-4 text-base font-medium">
                Upload Resume
              </label>
              <input
                name="resume"
                className="rounded-lg p-2 bg-inherit border border-gray-400"
                type="file"
                accept=".pdf"
                onChange={handleResumeUpload}
              />
              <DialogClose asChild>
                <Button className="mt-8" type="submit">
                  Submit
                </Button>
              </DialogClose>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Resume;
