import { useEffect, useState } from "react";
import ProfileHead from "./ProfileHead";
import About from "./About";
import Skills from "./Skills";
import Education from "./Education";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ProfileLayout = () => {
  const [profileData, setProfileData] = useState({});
  const location = useLocation();
  
  useEffect(() => {
    const fetchData = async () => {

        const userId = location.pathname.split("/")[2]
      const response = await axios.post(`/profile/getOthers`,{
        userId:userId
      });
      console.log(response.data);
      setProfileData(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-10">
      <div className="flex gap-4">
        <div className="w-1/2 gap-4 flex flex-wrap flex-col">
          <ProfileHead profile={profileData} />
          <Education profile={profileData} />
        </div>
        <div className="w-1/2 gap-4 flex flex-col">
          <About profile={profileData} />
          <Skills profile={profileData} />
        </div>{" "}
      </div>
    </div>
  );
};

export default ProfileLayout;
