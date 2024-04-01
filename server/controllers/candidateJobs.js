import noOfCandidatesModel from "../models/noOfCandidates.js";

export const getMyAppliedJobs = async (req, res) => {
  const { userId } = req?.query;
  console.log(userId);

  try {
    const myAppliedJobs = await noOfCandidatesModel
      .find({ user: userId })
      .sort({ _id: -1 });
    res.status(200).json(myAppliedJobs);
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
