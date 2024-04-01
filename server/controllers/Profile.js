import Candidate from "../models/candidate.js";
import Recruiter from "../models/recruiter.js";
import Creator from "../models/creator.js";
import jwt from "jsonwebtoken";

const getProfile = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  try {
    if (token) {
      const userId = jwt.verify(token, process.env.JWT_SECRET).id;

      const creator = await Creator.findById(userId);
      if (creator) {
        return res.json(creator);
      }

      const candidate = await Candidate.findById(userId).populate("projects");
      if (candidate) {
        return res.json(candidate);
      }
      const recruiter = await Recruiter.findById(userId);
      if (recruiter) {
        return res.json(recruiter);
      } else {
        return res.status(400).json({ msg: "user not found" });
      }
    } else {
      return res.status(400).json({ msg: "token not found" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const getOthers = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  try {
    const candidate = await Candidate.findById(userId);
    if (candidate) {
      return res.json(candidate);
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export { getProfile };
