import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    userId:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    message:{
        type: String,  
        required: true,
    },
},
    {
        timestamps: true
    }
);

export default mongoose.model('Feedback', feedbackSchema);