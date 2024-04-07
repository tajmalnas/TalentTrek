import mongoose from "mongoose";
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    uploader: {
        type:String,
        required:true,
    },
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    skills:{
        type: [String],
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    videos:[
        {
            videoUrl:{
                type: String,
                required: true,
            },
            videoTitle:{
                type: String,
                required: true,
            },
            isCompleted:{
                type: Boolean,
                default: false,
            }
        }
    ],
    aiTest:[
        {
            question:{
                type: String,
                required: true,
            }
        }
    ],
    test:[
        {
            question:{
                type: String,
                required: true,
            },
            options:{
                type: [String],
                required: true,
            },
            correctOption:{
                type: String,
                required: true,
            },
            selectedOption:{
                type: String,
                default: null,
            }
        }
    ],
    studentsEnrolled:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Candidate",
        }
    ],
    rating : {
        numberOfRatings:{
            type: Number,
            default: 0,
        },
        totalRating:{
            type: Number,
            default: 0,
        },
    }
},{
    timestamps: true,
});

const CourseModel = mongoose.model('CourseModel', courseSchema);
export default CourseModel;