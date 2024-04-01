import React, { useEffect, useState } from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Plus, X } from "lucide-react";
import axios from "axios";

const Skills = ({ profile }) => {
  // const [skills, setSkills] = useState(
  //   profile?.skills[0].split(",")?.map((skill) => skill.trim())
  // );

  // const  = skillsArray.;
  // const skills = skillsArray[0]?;

  const [skillsData, setSkillsData] = useState(["java", "c++"]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post("/profile", {
        token: localStorage.getItem("token"),
      });
      console.log("profile data", response);
      setSkillsData(
        response.data?.skills[0].split(",")?.map((skill) => skill.trim())
      );
    };
    fetchData();
  }, []);

  // const skills = skillsData[0].split(",")?.map((skill) => skill.trim());
  console.log(skillsData);

  return (
    <div className="p-4 bg-[#191b2e] text-slate-100 rounded-xl">
      <p className="font-medium text-xl">Skills</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {skillsData != null &&
          skillsData?.map((skill, index) => (
            <div role="button" key={index}>
              <Badge className="text-sm">
                {skill} <X size={16} />
              </Badge>
            </div>
          ))}
      </div>
      <Button className="bg-[#2d2f40] hover:bg-[#2d2f40]/80  flex gap-2 w-full mt-8">
        <Plus size={16} />
        Add more
      </Button>
    </div>
  );
};

export default Skills;
