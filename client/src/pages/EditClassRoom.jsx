import axios from "axios";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
import { Button } from "@/components/ui/button";
import { imageDb } from "@/firebase/firebaseConfig";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";

const EditCourse = () => {
  const location = useLocation();
  const classRoomCode = location.pathname.split("/")[2];
  const [courseVideos, setCourseVideos] = useState([]);
  const [videoName, setVideoName] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [classRoomName, setClassroomName] = useState("");
  const [classDesc, setClassDesc] = useState("");
  const [classCode, setClassCode] = useState("");
const [questions, setQuestions] = useState({
    que1 : '',
    que2 : '',
    que3 : '',
    que4 : '',
    que5 : ''
})
const getQuestionsArray = () => {
    const questionsArray = Object.values(questions);
    return questionsArray.filter(question => question.trim() !== ''); // Filter out empty questions
  };
  const fetchContent = async () => {
    try {
      axios
        .post("/classroom/get-classroom", {
          classRoomCode,
        })
        .then((res) => {
          console.log("response", res.data.classroom);
          setClassroomName(res?.data?.classroom.name);
          setClassDesc(res?.data?.classroom.description);
          setClassCode(res?.data?.classroom.classRoomCode);
          setCourseVideos(res?.data?.classroom?.videos);
        })
        .catch((err) => {
          console.log(err.response);
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imgref = ref(imageDb, `files/${v4()}`);
      uploadBytes(imgref, selectedFile).then((value) => {
        console.log("image uploaded", value);
        toast.success("Video uploaded successfully");
        getDownloadURL(value.ref).then((url) => {
          console.log("url", url);
          setVideoUrl(url);
        });
      });
    } else {
      console.log("no file selected");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (videoName === "" || videoUrl === "") {
      console.log("Please fill all the fields");
      return;
    }
    await axios
      .post("/classroom/add-video", {
        classRoomCode,
        videoTitle: videoName,
        videoUrl,
      })
      .then((res) => {
        console.log("response", res?.data?.classRoom);
        setVideoName("");
        setVideoUrl("");
        fetchContent();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const submitQuestionnaire = async (e) => {
    e.preventDefault();
    const questionsArray = getQuestionsArray();
    if (questionsArray.length < 5) {
        console.log("Please fill all the fields");
        return;
    }
    console.log("questions", questionsArray);
    // await axios
    //     .post("/classroom/add-questionnaire", {
    //         classRoomCode,
    //         questions,
    //     })
    //     .then((res) => {
    //         console.log("response", res?.data?.classRoom);
    //         setQuestions({
    //             que1: '',
    //             que2: '',
    //             que3: '',
    //             que4: '',
    //             que5: ''
    //         });
    //         fetchContent();
    //     })
    //     .catch((err) => {
    //         console.log(err.response);
    //     });
};

  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <div className="text-white w-full">
      <div className="text-center text-4xl h-[28vh] w-full bg-[#191b2e] rounded-md mb-5"></div>
      <div className="h-[10vh] w-full flex justify-between mb-7">
        <div className="">
          <div className="text-3xl font-medium tracking-wider">
            {classRoomName}
          </div>
          <div className="text-lg font-medium text-slate-500">{classDesc}</div>
        </div>
        <div className="flex gap-3 items-center justify-center mr-10">
          <div className="text-lg font-medium tracking-wide">{classCode}</div>
          <button
            className="p-2 bg-indigo-500 hover:bg-indigo-600 h-10 w-10 rounded-full flex justify-center items-center"
            onClick={() => {
              navigator.clipboard.writeText(classCode);
              toast.success("Class code copied to clipboard");
            }}
          >
            +
          </button>
        </div>
      </div>
      <div className="flex-col w-full gap-10">
        <div className="mb-4 flex gap-4">
          <div className="">
            <Dialog>
              <DialogTrigger>
                <div className="p-3 flex gap-2 font-medium tracking-wide text-slate-100 text-sm border border-sky-600 hover:bg-blue-500 hover:text-white hover:cursor-pointer rounded-xl">
                  <PlusCircle size={20} />
                  Add Video
                </div>
              </DialogTrigger>

              <DialogContent className="">
                <div className="flex flex-col">
                  <div>
                    <label className="text-black">Title</label>
                    <input
                      type="text"
                      value={videoName}
                      onChange={(e) => setVideoName(e.target.value)}
                      className="w-full p-2 bg-gray-100 border border-black rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-black">Video</label>
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className="w-full p-2 bg-gray-100 border border-black rounded-lg"
                    />
                  </div>
                  <div className="flex">
                    <Button
                      className="mt-6 bg-indigo-500 hover:bg-indigo-600"
                      onClick={submitHandler}
                    >
                      Add Video
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="">
            <Dialog>
              <DialogTrigger>
                <div className="p-3 flex gap-2 font-medium tracking-wide text-slate-100 text-sm border border-sky-600 hover:bg-blue-500 hover:text-white hover:cursor-pointer rounded-xl">
                  <PlusCircle size={20} />
                  Add Questionnaire
                </div>
              </DialogTrigger>

              <DialogContent className="">
                <div className="flex flex-col">
                  <div className="flex flex-col gap-3">
                    <label className="text-black">Enter Questions</label>
                    <input
                      type="text"
                      value={questions.que1}
                      onChange={(e) => setQuestions(e.target.value)}
                      className="w-full p-2 bg-gray-100 border border-black rounded-lg"
                    />
                    <input
                      type="text"
                      value={questions.que2}
                      onChange={(e) => setQuestions(e.target.value)}
                      className="w-full p-2 bg-gray-100 border border-black rounded-lg"
                    />
                    <input
                      type="text"
                      value={questions.que3}
                      onChange={(e) => setQuestions(e.target.value)}
                      className="w-full p-2 bg-gray-100 border border-black rounded-lg"
                    />
                    <input
                      type="text"
                      value={questions.que4}
                      onChange={(e) => setQuestions(e.target.value)}
                      className="w-full p-2 bg-gray-100 border border-black rounded-lg"
                    />
                    <input
                      type="text"
                      value={questions.que5}
                      onChange={(e) => setQuestions(e.target.value)}
                      className="w-full p-2 bg-gray-100 border border-black rounded-lg"
                    />
                  </div>
                  <div className="flex">
                    <Button
                      className="mt-6 bg-indigo-500 hover:bg-indigo-600"
                      onClick={submitQuestionnaire}
                    >
                      Add Questionnaire
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="">
          <div className="p-3 flex gap-2 font-medium tracking-wide text-slate-100 text-sm border border-sky-600 hover:bg-blue-500 hover:text-white hover:cursor-pointer rounded-xl">
                   View Student Status
                </div>
          </div>
        </div>

        <div className="flex w-full">
          {courseVideos?.map((video, index) => {
            return (
                <div key={index} className="w-1/3 p-4 ">
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <video controls className="w-full">
                            <source src={video.videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <div className="text-lg font-medium mt-2">
                            {video.videoTitle}
                        </div>
                    </div>
                </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
