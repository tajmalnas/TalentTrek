import mongoose from "mongoose";

const projectModelSchema = mongoose.Schema({
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "candidate",
    required: true,
  },
  projectTitle: {
    type: String,
  },
  projectDesc: {
    type: String,
  },
  projectPic: {
    type: String,
  },
});

const projectModel = mongoose.model("projectModel", projectModelSchema);
export default projectModel;
