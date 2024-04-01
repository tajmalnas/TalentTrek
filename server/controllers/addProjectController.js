import candidate from "../models/candidate.js";
import projectModel from "../models/projectModel.js";
import jwt from "jsonwebtoken";

export const addProject = async (req, res) => {
  const { token, projectTitle, projectDesc, projectPic } = req.body;

  try {
    const candidateId = jwt.verify(token, process.env.JWT_SECRET).id;
    console.log("candidateId", candidateId);
    if(!candidateId) return res.status(404).json({message: "User not found"});
    else{
      console.log("candidateId", candidateId);
    }
    const newProject = new projectModel({
      candidateId,
      projectTitle,
      projectDesc,
      projectPic,
    });
    await newProject.save();

    const updateCandidate = await candidate
      .findByIdAndUpdate(
        candidateId,
        { $push: { projects: newProject._id } },
        { new: true }
      )
      .populate("projects")
      .exec();

    return res.status(201).json(updateCandidate);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
