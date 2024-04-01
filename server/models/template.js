import mongoose from "mongoose";
const Schema = mongoose.Schema;

const templateSchema = new Schema({
  recruiterId : {
    type : Schema.Types.ObjectId,
    ref : 'Recruiter',
  },
  role : {
    type : String
  },
  questions : {
    type : [String]
  }
});

export default mongoose.model("Template", templateSchema);
