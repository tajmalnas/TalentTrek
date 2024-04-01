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
        }
    ],
},{
    timestamps: true,
});

const CourseModel = mongoose.model('CourseModel', courseSchema);
export default CourseModel;