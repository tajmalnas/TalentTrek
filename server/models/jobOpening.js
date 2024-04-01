import mongoose from "mongoose";
const Schema = mongoose.Schema;

const jobSchema = new Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recruiter",
    },
    role: {
      type: String,
    },
    location: {
      type: String,
    },
    companyName: {
      type: String,
    },
    companyDesc: {
      type: String,
    },
    skillReq: {
      type: String,
    },
    exp: {
      type: String,
    },
    jobDesc: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    noOfCandidates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "noOfCandidatesModel",
      },
    ],
    interviewSchedule: {
      type: {
        startDate: String,
        endDate: String,
        startTime: String,
        endTime: String,
        interval: String,
        breakDuration: String,
      },
    },
    timeSlots: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "InterviewSlot",
      },
    ],
    noOfSelCandidates: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("jobOpening", jobSchema);
