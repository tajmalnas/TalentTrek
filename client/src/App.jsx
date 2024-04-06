/* eslint-disable no-unused-vars */
import "./App.css";
import Sidebar from "./components/Sidebar";
import { Route, Routes, useLocation } from "react-router-dom";
import { Landingpage } from "./pages/Landingpage";
import SignInFormDemo from "./pages/Signin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import SignupFormDemo from "./pages/Signup";
import RecruiterEdit from "./pages/RecruiterEdit";
import CandidateEdit from "./pages/CandidateEdit";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateJob from "./components/CreateJob";
import ViewJobPosts from "./components/ViewJobPosts";
import ShortlistedCandidates from "./components/ShortlistedCandidates";
import CodeEditor from "./pages/CodeEditor";
// import AiInterview from "./pages/AiInterview/AiInterview";
import ExploreAllJobs from "./components/ExploreAllJobs";
import ProfilePage from "./pages/profile-page/ProfilePage";
import InterviewSlotsTable from "./components/InterviewSlotsTable";
import Landing from "./components/CodeEditor/components/Editor-Landing";
import Meeting from "../src/components/Meeting";
import MyAppliedJobs from "./components/MyAppliedJobs";
import AppliedCandidatedOnPost from "./pages/AppliedCandidatedOnPost";
import TemplatePage from "../src/pages/template-page";
import ProfilePageNew from "./pages/profile-page/ProfilePageNew";
import Feedback from "./components/Feedback";
import CreatorEdit from "./pages/CreatorEdit";
import CreateCourse from "./pages/CreateCourse";
import EditCourse from "./pages/EditCourse";
import AiInterview from "./pages/InterviewPrep/AiInterview";
import StartPage from "./pages/InterviewPrep/StartPage";
import MCQsTestPage from "./pages/MCQS-test-videocam/MCQs";

import MyCoursesCreator from "./pages/MyCoursesCreator";
import CreateClasroom from "./pages/CreateClassroom";
import EditClassRoom from "./pages/EditClassRoom";
import EnrolledClass from "./components/EnrolledClass";
import ViewClassroom from "./pages/ViewClassroom";
import ExploreCourses from "./pages/ExploreCourses";
import CreatorClassrooms from "./pages/CreatorClassrooms";
import MyCourseStudentOneCourse from "./pages/MyCourseStudentOneCourse";
import StudentDashboard from "./components/Student Dashboard/StudentDashboard";
import TopRatedStudents from "./components/Top Rated Students/TopRatedStudents";
import ClassTest from "./pages/ClassTest";
import ClassTestMCQs from "./pages/ClassTestMCQs";
import FeedbackForm from "./components/feedback-form/FeedbackForm";

axios.defaults.baseURL = "http://localhost:5000/";

function App() {
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();
  const role = useSelector((state) => state.role);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role) {
      console.log(role);
    } else {
      localStorage.setItem("role", "");
    }
  }, []);

  if (location.pathname === "/") {
    return <Landingpage />;
  }

  return (
    <div className="min-h-screen bg-[#030519] flex md:flex-row flex-col md:justify-between">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
      <div className="md:min-w-72 md:max-w-72 w-full">
        <Sidebar />
      </div>
      <div className="p-4 w-full">
        <div className="min-h-screen bg-[#030519] flex md:flex-row flex-col md:justify-center">
          <Routes>
            <Route path="/" element={<Landingpage />} />
            <Route
              path="/about"
              element={
                <h1 className="text-3xl font-bold text-center text-white">
                  About
                </h1>
              }
            />

            <Route path="/signup" element={<SignupFormDemo />} />
            <Route path="/signin" element={<SignInFormDemo />} />

            <Route path="/createJob" element={<CreateJob />} />
            <Route path="/viewJobPosts" element={<ViewJobPosts />} />

            <Route path="/edit-recruiter" element={<RecruiterEdit />} />
            <Route path="/edit-candidate" element={<CandidateEdit />} />
            <Route path="/edit-creator" element={<CreatorEdit />} />

            {/* <Route path="/ai-interview/:id" element={<AiInterview />} /> */}

            {/* <Route path="/meeting/:roomId" element={<Meeting />} /> */}
            <Route path="/code-editor" element={<Landing />} />
            <Route path="/interview-slot" element={<InterviewSlotsTable />} />
            <Route
              path="/shortlisted-candidates"
              element={<ShortlistedCandidates />}
            />
            <Route path="/interview-slots" element={<InterviewSlotsTable />} />
            <Route path="/success" element={<Landingpage />} />
            <Route path="/cancel" element={<Landingpage />} />

            {/* <Route path="/exploreAllJobs" element={<ExploreAllJobs />} /> */}
            <Route path="/profile-page" element={<ProfilePage />} />

            <Route path="/my-applied-jobs" element={<MyAppliedJobs />} />
            <Route
              path="/job/applicants/:id"
              element={<AppliedCandidatedOnPost />}
            />
            {/* <Route path="/templatepage" element={<TemplatePage />} /> */}
            <Route path="/profile/:id" element={<ProfilePageNew />} />
            <Route path="/feedback" element={<Feedback />} />

            <Route path="/create-course" element={<CreateCourse />} />
            <Route path="/edit-course/:id" element={<EditCourse />} />
            <Route path="/my-created-courses" element={<MyCoursesCreator />} />

            <Route path="/create-classroom" element={<CreateClasroom />} />
            <Route path="/edit-classroom/:id" element={<EditClassRoom />} />

            <Route path="/enrolled-classroom" element={<EnrolledClass />} />
            <Route path="/classroom/:id" element={<ViewClassroom />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/top-rated-students" element={<TopRatedStudents />} />

            <Route path="/explore-all-courses" element={<ExploreCourses />} />

            <Route path="/my-classrooms" element={<CreatorClassrooms />} />
            <Route
              path="/my-courses/:id"
              element={<MyCourseStudentOneCourse />}
            />
            <Route path="/class-test/:id" element={<ClassTest />} />
            <Route exact path="/start-page" element={<StartPage />} />
            <Route path="/ai-interview/:category" element={<AiInterview />} />

            <Route path="/MCQs-test-webcam" element={<MCQsTestPage/>} />
            <Route path="/give-class-test/:id" element={<ClassTestMCQs/>} />
            <Route path='/feedback-form' element={<FeedbackForm/>}/>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
