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
            videoDescription : {
                type : String,
            }
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
    feedbacks: [
        {
            type : String,
        },
    ],
    test : [
        {
            question : {
                type : String,
                required : true,
            },
            options : {
                type : [String],
                required : true,
            },
            correctOption : {
                type : String,
                required : true,
            },
            selectedOption : {
                type : String,
                default : null,
            }
        }
    ]
},
{
    timestamps: true,
});

const ClassroomModel = mongoose.model('ClassroomModel', classroomSchema);
export default ClassroomModel;