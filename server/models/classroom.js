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
            ref: "studentModel",
        },
    ],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "creatorModel",
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "courseModel",
    },
    classroomJoined: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "classroomModel",
        },
    ],
},
{
    timestamps: true,
});

const ClassroomModel = mongoose.model('ClassroomModel', classroomSchema);
export default ClassroomModel;