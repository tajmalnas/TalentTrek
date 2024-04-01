import Candidate from "../models/candidate.js";

export const addResume = async (req, res) => {
  const { candidateId, resume } = req.body;
  try {
    console.log(resume);
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(400).json({ msg: "user not found" });
    }
    candidate.resume = resume;
    await candidate.save();
    console.log("candidate", candidate);

    return res.status(201).json(candidate);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
