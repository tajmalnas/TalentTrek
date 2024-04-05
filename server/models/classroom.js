import mongoose from "mongoose";
const Schema = mongoose.Schema;

const classroomSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    skills: {
        type: [String],
        required: true,
    },
    videos: [
        {
            videoUrl: {
                type: String,
                required: true,
            },
            videoTitle: {
                type: String,
                required: true,
            },
        },
    ],
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Candidate",
        },
    ],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "creatorModel",
    },
    questions: [
        {
            type : String,
        }
    ],
    classRoomCode : {
        type: String,
        required: true,
    },
},
{
    timestamps: true,
});

const ClassroomModel = mongoose.model('ClassroomModel', classroomSchema);
export default ClassroomModel;