import { useEffect, useState } from "react";
import ProfileHead from "./ProfileHead";
import About from "./About";
import Skills from "./Skills";
import Education from "./Education";
import axios from "axios";
import Projects from "./Projects";
import Resume from "./Resume";

const ProfileLayout = () => {
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post("/profile", {
        token: localStorage.getItem("token"),
      });
      console.log("profile data", response);
      setProfileData(response.data);
    };
    fetchData();
  }, []);

  console.log(profileData);

  return (
    <div className="p-10">
      <div className="flex gap-4">
        <div className="w-1/2 gap-4 flex flex-wrap flex-col">
          <ProfileHead profile={profileData} />
          <Education profile={profileData} />
          <Projects profile={profileData} />
        </div>
        <div className="w-1/2 gap-4 flex flex-col">
          <About profile={profileData} />
          <Skills profile={profileData} />
          <Resume profile={profileData} />
        </div>{" "}
      </div>
    </div>
  );
};

export default ProfileLayout;
