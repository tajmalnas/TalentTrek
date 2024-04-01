import Candidate from "../models/candidate.js";
import jwt from "jsonwebtoken";

const updateProfile = async (req, res) => {
  const {
    token,
    firstName,
    lastName,
    image,
    about,
    contact,
    skills,
    experience,
    education,
  } = req.body;
  console.log(req.body);
  if (
    !token ||
    !firstName ||
    !lastName ||
    !about ||
    !contact ||
    !skills ||
    !experience ||
    !education
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  try {
    if (token) {
      const userId = jwt.verify(token, process.env.JWT_SECRET).id;
      console.log("userId", userId);
      const candidate = await Candidate.findById(userId);
      console.log("candidate", candidate);
      if (!candidate) {
        return res.status(400).json({ msg: "user not found" });
      }
      candidate.firstName = firstName;
      candidate.lastName = lastName;
      candidate.profilePicture = image;
      candidate.about = about;
      candidate.contact = contact;
      candidate.skills = skills;
      candidate.experience = experience;
      candidate.education = education;
      await candidate.save();
      console.log("candidate", candidate);
      res.json({ msg: "profile updated successfully" });
    } else {
      return res.status(400).json({ msg: "token not found" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export { updateProfile };
