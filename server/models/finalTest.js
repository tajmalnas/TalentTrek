import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const finalTestSchema = new Schema({
    courseId: {
        type:String
    },
    studentId:{
        type:String
    },
    marks:{
        type:Number
    },
    totalMarks:{
        type:Number
    },
},{
    timestamps:true
});

export default mongoose.model('FinalTest',finalTestSchema);