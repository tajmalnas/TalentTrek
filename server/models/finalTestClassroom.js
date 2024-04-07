import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const finalTestClassroomSchema = new Schema({
    classroomId: {
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

export default mongoose.model('FinalTestClassroom',finalTestClassroomSchema);