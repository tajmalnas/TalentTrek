/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Bot,
  Code,
  Dock,
  Edit,
  LogOut,
  LogIn,
  MessageSquareText,
  Telescope,
  Timer,
  LineChart,
  User,
  Video,
  Backpack,
  FolderUp,
  Compass,
  NotebookPen,
  NotebookText,
  LayoutDashboard,
} from "lucide-react";

const Sidebar = () => {
  const auth = useSelector((state) => state.isAuthenticated.isAuthenticated);
  console.log("auth", auth);
  const [isOpen, setIsOpen] = useState(true);
  const getRole = localStorage.getItem("role");
  console.log(getRole);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Hamburger Menu */}
      <div className="md:hidden sm:absolute md:relative flex items-center w-full h-12 bg-white dark:bg-black/40">
        <button
          onClick={toggleSidebar}
          className="block text-gray-500 dark:text-gray-300 left-4 absolute focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <h1 className="text-white m-auto">Logo-with-name</h1>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 z-50 left-0 w-72 md:flex h-screen  py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-[#191b2e] dark:border-gray-700 transition-transform duration-300`}
      >
        <div className="flex flex-col">
          <div className="flex flex-row">
            <a href="#">
              <div className="px-3 flex gap-2 items-center text-lg text-white">
                <a href="#" className="">
                  <svg
                    className="h-8 w-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
                    <polyline points="7.5 19.79 7.5 14.6 3 12" />
                    <polyline points="21 12 16.5 14.6 16.5 19.79" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                </a>
                <p
                  className="font-black tracking-wider text-2xl"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #0061ff, #60efff)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  TalentTrek
                </p>
              </div>
            </a>
            {/* Close button */}
            <button
              onClick={toggleSidebar}
              className="ml-auto md:hidden text-gray-500 dark:text-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Rest of the Sidebar content */}
          <div className="flex flex-col justify-between px-5 flex-1 mt-6">
            <nav className="-mx-3  ">
              <div className="">
                {getRole === "creator" ? (
                  <Link
                    to={"/create-course"}
                    className="flex items-center px-3 py-4 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    href="#"
                  >
                    <Edit />

                    <span className="mx-2 font-medium">Create Course</span>
                  </Link>
                ) : getRole === "recruiter" ? (
                  <Link
                    to={"/createJob"}
                    className="flex items-center px-3 py-4 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    href="#"
                  >
                    <Edit />

                    <span className="mx-2 font-medium ">List a Job</span>
                  </Link>
                ) : (
                  <div>
                    <Link
                      to={"/explore-all-courses"}
                      className="flex items-center px-3 py-4 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    >
                      <Compass />
                      <span className="mx-2 font-medium ">Explore Courses</span>
                    </Link>
                  </div>
                )}
                {getRole === "creator" ? (
                  <div>
                    <Link
                      to={"/create-classroom"}
                      className="flex items-center px-3 py-4 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                      href="/create-classroom"
                    >
                      <Edit />
                      <span className="mx-2 font-medium">Create Classroom</span>
                    </Link>
                  </div>
                ) : getRole === "recruiter" ? (
                  <Link
                    to={"/viewJobPosts"}
                    className="flex items-center px-3 py-4 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    href="#"
                  >
                    <Dock />

                    <span className="mx-2 font-medium ">Job Posted</span>
                  </Link>
                ) : (
                  <div>
                    <Link
                      to={"/enrolled-classroom"}
                      className="flex items-center px-3 py-4 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                      href="#"
                    >
                      <Dock />
                      <span className="mx-2 font-medium">Enrolled Classes</span>
                    </Link>
                    <Link
                      className="flex items-center px-3 py-4 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                      to={"/my-courses-candidates"}
                    >
                      <NotebookText />

                      <span className="mx-2 font-medium">My Courses</span>
                    </Link>
                    <Link
                      className="flex items-center px-3 py-4 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                      to={"/start-page"}
                    >
                      <Bot />

                      <span className="mx-2 font-medium">
                        AI Interview Prep
                      </span>
                    </Link>
                    <Link
                      to={"/MCQs-test-webcam"}
                      className="flex items-center px-3 py-4 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    >
                      <NotebookPen />
                      <span className="mx-2 font-medium">MCQs test</span>
                    </Link>
                  </div>
                )}
              </div>

              <div className="">
                {getRole === "recruiter" ? (
                  <Link
                    to="/top-rated-students"
                    className="flex items-center px-3 py-4 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    href="#"
                  >
                    <LineChart />

                    <span className="mx-2 font-medium ">
                      Student Leaderboard
                    </span>
                  </Link>
                ) : (
                  <Link
                    className="flex items-center px-3 py-4 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    to="/feedback"
                  >
                    <MessageSquareText />

                    <span className="mx-2 font-medium">Feedback</span>
                  </Link>
                )}

                {getRole === "creator" && (
                  <Link
                    className="flex items-center px-3 py-4 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    to={"my-created-courses"}
                  >
                    <FolderUp />

                    <span className="mx-2 font-medium">Uploaded Courses</span>
                  </Link>
                )}
                {/* ) : (
                  <Link
                    className="flex items-center px-3 py-4 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    to={"/ai-interview/12345"}
                  >
                    <Bot />

                    <span className="mx-2 font-medium">AI Interview</span>
                  </Link> */}
              </div>

              <div className="">
                {getRole === "creator" && (
                  <Link
                    to={"/my-classrooms"}
                    className="flex items-center px-3 py-4 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                  >
                    <Backpack />
                    <span className="mx-2 font-medium">Classrooms</span>
                  </Link>
                )}

                {/* {getRole === "recruiter" ? (
                  <Link
                    className="flex items-center px-3 py-4 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    to="/templatepage"
                  >
                    <Video />
                    <span className="mx-2 font-medium">
                      Interview Templates
                    </span>
                  </Link>
                ) : (
                  <Link
                    className="flex items-center px-3 py-4 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    to={"/meeting/12345"}
                  >
                    <Video />
                    <span className="mx-2 font-medium">Personal Interview</span>
                  </Link>
                )} */}
              </div>
              {getRole == "candidate" && (
                <div>
                <Link
                  to={"/student-dashboard"}
                  className="flex items-center px-3 py-4 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                  href="#"
                >
                  <LayoutDashboard />
                  <span className="mx-2 font-medium">Dashboard</span>
                </Link>
              </div>)}
            
              <div className="">

                {/* Profile and Logout links */}
                {auth === true && (
                  <Link
                    to={"/profile-page"}
                    className="flex items-center px-3 py-4 text-gray-200 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    href="#"
                  >
                    <User />

                    <span className="mx-2 font-medium ">Profile</span>
                  </Link>
                )}

                {auth === true && (
                  <Link
                    to={"/signin"}
                    className="flex items-center px-3 py-4 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                  >
                    <LogOut />
                    <span className="mx-2 font-medium ">Logout</span>
                  </Link>
                )}

                {/* authentication */}

                {auth === false && (
                  <Link
                    to={"/signup"}
                    className="flex items-center px-3 py-4 text-gray-200 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    href="#"
                  >
                    <LogIn />

                    <span className="mx-2 font-medium ">SignUp</span>
                  </Link>
                )}

                {auth === false && (
                  <Link
                    to={"/signin"}
                    className="flex items-center px-3 py-4 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    href="#"
                  >
                    <LogIn />
                    <span className="mx-2 font-medium ">SignIn</span>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
