import jobOpening from "../models/jobOpening.js";
import noOfCandidatesModel from "../models/noOfCandidates.js";
import Candidate from "../models/candidate.js";
import jwt from "jsonwebtoken";
import _ from "lodash";

export const createJobOpening = async (req, res) => {
  const post = req.body;
  const newPost = new jobOpening({
    ...post,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    return res.status(201).json({ msg: `Post added successfully` });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//recommended job posts
export const getAllJobPosts = async (req, res) => {
  const skillsString = req.query.skills;
  const skillsArray = skillsString.trim().split(",");
  // console.log("skills arr", skillsArray);
  try {
    const jobs = await jobOpening.find();
    const results = jobs.map((job) => {
      const jobSkillsArray = job.skillReq
        .split(",")
        .map((skill) => skill.trim()); // Split job skills into an array
      const sharedTopics = _.intersection(skillsArray, jobSkillsArray); // Find shared skills
      const similarity =
        sharedTopics.length /
        Math.max(skillsArray.length, jobSkillsArray.length); // Calculate similarity

      return { job, similarity };
    });

    const recommended = _.orderBy(results, ["similarity"], ["desc"]);
    // console.log("recommended", recommended);
    res.status(200).json({ recommended });
  } catch (error) {
    console.error("Error fetching job posts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//get the jobs posted by a partocular interviewer
export const getJobPosts = async (req, res) => {
  const creatorId = req.params.creatorId;
  console.log("Creator ID:", creatorId); // Log creatorId to verify it's being correctly retrieved from the URL
  try {
    const jobPosts = await jobOpening
      .find({ creator: creatorId })
      .sort({ _id: -1 });
    // console.log("Job Posts:", jobPosts); // Log jobPosts to verify if any documents are returned
    res.status(200).json({ jobPosts });
  } catch (error) {
    console.error("Error fetching job posts:", error); // Log any errors that occur during the database query
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addCandidate = async (req, res) => {
  const { postId, userId, companyName, jobLocation, jobDesc, role } = req?.body;
  console.log({ postId, userId });

  try {
    const newCandidate = new noOfCandidatesModel({
      post: postId,
      user: userId,
      companyName,
      jobLocation,
      jobDesc,
      role,
    });
    await newCandidate.save();

    console.log("newCandidate", newCandidate);

    // const updatedJobPost1 = await jobOpening.findById(postId);

    const updatedJobPost = await jobOpening.findByIdAndUpdate(
      postId,
      { $push: { noOfCandidates: newCandidate._id } },
      { new: true }
    );
    res.status(201).json(updatedJobPost);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Failed to add candidate",
    });
  }
};

export const addCandidateMarks = async (req, res) => {
  const { postId, token, marks } = req?.body;
  if (!token) {
    return res.status(400).json({ msg: "token not found" });
  }
  try {
    const userId = jwt.verify(token, process.env.JWT_SECRET).id;
    if (!userId) {
      return res.status(400).json({ msg: "user not found" });
    }
    const updatedCandidate = await noOfCandidatesModel.findOneAndUpdate(
      { post: postId, user: userId },
      { marks: marks },
      { new: true }
    );
    res.status(201).json(updatedCandidate);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Failed to add candidate marks",
    });
  }
};

export const allCandidatesApplied = async (req, res) => {
  const { postId } = req.body;

  if (!postId) {
    return res.status(400).json({ msg: "postId not found" });
  }

  try {
    // Find all candidate IDs who applied for the specified post
    const candidateIds = await noOfCandidatesModel.find({ post: postId });

    if (!candidateIds || candidateIds.length === 0) {
      return res.status(400).json({ msg: "No candidates ID found" });
    }
    // console.log("candidateIds", candidateIds);
    let candidatesArray = [];

    console.log("candidateIds", candidateIds);

    for (let i = 0; i < candidateIds.length; i++) {
      const candidate = await Candidate.findById(candidateIds[i].user);
      const candidateWithMarks = {
        candidate,
        marks: candidateIds[i].marks,
      };
      candidatesArray.push(candidateWithMarks);
    }

    // Return candidate data along with marks
    res.status(200).json(candidatesArray);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Failed to fetch candidates",
    });
  }
};
