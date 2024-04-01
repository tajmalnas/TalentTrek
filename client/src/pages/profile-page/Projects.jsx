import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageDb } from "@/firebase/firebaseConfig";
import { v4 } from "uuid";
import { Plus } from "lucide-react";
import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Projects = ({ profile }) => {
  const navigate = useNavigate();
  // const [projectData, setProjectData] = useState({
  //   candidateId: localStorage.getItem("token"),
  //   projectTitle: "",
  //   projectDesc: "",
  //   projectPic: "",
  // });
  const [projectPic, setProjectPic] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDesc, setProjectDesc] = useState("");

  const [projects, setProjects] = useState([]);

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imgref = ref(imageDb, `files/${v4()}`);
      uploadBytes(imgref, selectedFile).then((value) => {
        console.log("image uploaded", value);
        getDownloadURL(value.ref).then((url) => {
          console.log("url", url);
          // setProjectData({ ...projectData, [e.target.name]: url });
          setProjectPic(url);
        });
      });
    } else {
      console.log("no file selected");
    }
  };

  const fetchData = async () => {
    const response = await axios.post("/profile", {
      token: localStorage.getItem("token"),
    });
    console.log("profile data", response);
    setProjects(response?.data?.projects);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const addProject = async (e) => {
    e.preventDefault();
    // setProjectData({ ...projectData, candidateId: profile?._id });

    const response = await axios.post("/candidate/addProject", {
      token: localStorage.getItem("token"),
      projectTitle:projectTitle,
      projectDesc:projectDesc,
      projectPic:projectPic
    });
    console.log(response);
    fetchData();
    navigate("/profile-page");
  };

  // const [view, setView] = useState(false);

  return (
    <div className="p-4 bg-[#191b2e] text-slate-100 rounded-xl">
      <p className="font-medium text-xl">Projects</p>
      <div className="mt-6 flex flex-col gap-6">
        {projects?.map((project, index) => (
          <div className="p-2 rounded-xl bg-[#2d2f40] " key={index}>
            <img
              className="h-40 w-full object-cover rounded-xl"
              src={project?.projectPic}
              alt="project pic"
            />
            <p className="mt-2 text-lg font-semibold">
              {project?.projectTitle}
            </p>
            <p className="mt-2 text-justify">{project?.projectDesc}</p>
          </div>
        ))}
      </div>

      <Dialog>
        <DialogTrigger asChild className="w-full">
          <Button className="bg-[#2d2f40] hover:bg-[#2d2f40]/80  flex gap-2 w-full mt-8">
            <Plus size={16} />
            Add more
          </Button>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={addProject} className="flex flex-col">
            <label className="mt-4 text-base font-medium">Project Photo</label>
            <input
              name="projectPic"
              className="rounded-lg p-2 bg-inherit border border-gray-400"
              type="file"
              onChange={handleFileUpload}
            />
            <label className="text-base font-medium">Project Title</label>
            <input
              name="projectTitle"
              className="rounded-lg p-2 bg-inherit border border-gray-400"
              required
              type="text"
              onChange={(e) =>
                setProjectTitle(e.target.value)
              }
            />
            <label className="mt-4 text-base font-medium">
              Project Description
            </label>
            <textarea
              name="projectDesc"
              className="rounded-lg p-2 bg-inherit border border-gray-400"
              type="text"
              required
              onChange={(e) =>
                setProjectDesc(e.target.value)
              }
            />

            <DialogClose asChild>
              <Button className="mt-8" type="submit">
                Submit
              </Button>
            </DialogClose>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Projects;
