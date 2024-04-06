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
  MessageSquareText,
  Telescope,
  Timer,
  User,
  Video,
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
        } fixed top-0 z-50 left-0 w-72 md:flex h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-[#191b2e] dark:border-gray-700 transition-transform duration-300`}
      >
        <div className="flex flex-col">
          <div className="flex flex-row">
            <a href="#">
              <div className="flex gap-2 items-center text-lg text-white">
                <a href="#" className="">
                  <svg
                    className="h-8 w-8 bg-gradient-to-r from-blue-600 to-cyan-400  "
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    {" "}
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />{" "}
                    <polyline points="7.5 4.21 12 6.81 16.5 4.21" />{" "}
                    <polyline points="7.5 19.79 7.5 14.6 3 12" />{" "}
                    <polyline points="21 12 16.5 14.6 16.5 19.79" />{" "}
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />{" "}
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                </a>
                <p
                  className="font-bold tracking-wide text-2xl"
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
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav className="-mx-3 space-y-6 ">
              <div className="space-y-3 ">
                {getRole === "creator" ? (
                  <Link
                    to={"/create-course"}
                    className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    href="#"
                  >
                    <Edit />

                    <span className="mx-2 font-medium">Create Course</span>
                  </Link>
                ) : getRole === "recruiter" ? (
                  <Link
                    to={"/createJob"}
                    className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    href="#"
                  >
                    <Edit />

                    <span className="mx-2 font-medium">List a Job</span>
                  </Link>
                ) : (
                  <Link
                    to={"/exploreAllJobs"}
                    className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    href="#"
                  >
                    <Telescope />
                    <span className="mx-2 font-medium">Explore Jobs</span>
                  </Link>
                )}
                {getRole === "creator" ? (
                  <Link
                    to={"/create-classroom"}
                    className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    href="/create-classroom"
                  >
                    <Dock />
                    <span className="mx-2 font-medium">Create ClassRoom</span>
                  </Link>
                ) : getRole === "recruiter" ? (
                  <Link
                    to={"/viewJobPosts"}
                    className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    href="#"
                  >
                    <Dock />

                    <span className="mx-2 font-medium">Job Posted</span>
                  </Link>
                ) : (
                  <Link
                    to={"/enrolled-classroom"}
                    className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    href="#"
                  >
                    <Dock />
                    <span className="mx-2 font-medium">Enrolled Classes</span>
                  </Link>
                )}
              </div>

              <div className="space-y-3 ">
                {getRole === "recruiter" ? (
                  <a
                    className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    href="#"
                  >
                    <Timer />

                    <span className="mx-2 font-medium">Schedule Interview</span>
                  </a>
                ) : (
                  <Link
                    className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    to="/feedback"
                  >
                    <MessageSquareText />

                    <span className="mx-2 font-medium">Feedback</span>
                  </Link>
                )}

                {getRole === "creator" ? (
                  <Link
                    className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    to={"my-created-courses"}
                  >
                    <Bot />

                    <span className="mx-2 font-medium">Uploaded Courses</span>
                  </Link>
                ) : (
                  <Link
                    className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    to={"/ai-interview/12345"}
                  >
                    <Bot />

                    <span className="mx-2 font-medium">AI Interview</span>
                  </Link>
                )}
              </div>

              <div className="space-y-3 ">
                <Link
                  to={"/code-editor"}
                  className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                >
                  <Code />
                  <span className="mx-2 font-medium">Code Editor</span>
                </Link>

                {getRole === "recruiter" ? (
                  <Link
                    className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    to="/templatepage"
                  >
                    <Video />
                    <span className="mx-2 font-medium">
                      Interview Templates
                    </span>
                  </Link>
                ) : (
                  <Link
                    className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    to={"/meeting/12345"}
                  >
                    <Video />
                    <span className="mx-2 font-medium">Personal Interview</span>
                  </Link>
                )}
              </div>
              <div className="space-y-3 ">
                <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">
                  Authentication
                </label>

                {/* Profile and Logout links */}
                {auth === true && (
                  <Link
                    to={"/profile-page"}
                    className="flex items-center px-3 py-2 text-gray-200 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    href="#"
                  >
                    <User />

                    <span className="mx-2 font-medium">Profile</span>
                  </Link>
                )}

                {auth === true && (
                  <Link
                    to={"/signin"}
                    className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                  >
                    <LogOut />
                    <span className="mx-2 font-medium">Logout</span>
                  </Link>
                )}

                {/* authentication */}

                {auth === false && (
                  <Link
                    to={"/signup"}
                    className="flex items-center px-3 py-2 text-gray-200 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    href="#"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"
                      />
                    </svg>

                    <span className="mx-2 font-medium">SignUp</span>
                  </Link>
                )}

                {auth === false && (
                  <Link
                    to={"/signin"}
                    className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    href="#"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="mx-2 font-medium">SignIn</span>
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
