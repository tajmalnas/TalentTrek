import mongoose  from 'mongoose';
const Schema = mongoose.Schema;

const recruiterSchema = new Schema({
    username: { 
        type: String, 
        required: true, 
    },
    email: { 
        type: String, 
        required: true,
        unique: true
    },
    password: { 
        type: String, 
        required: true 
    },
    profilePicture: { 
        type: String, 
        default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png'
    },
    role: { 
        type: String, 
        default: 'recruiter'
    },
    isFormFilled: {
        type: Boolean,
        default: false
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    currentPosi: {
        type: String,
    },
    about: {
        type: String,
    },
    company: {
        type: String,
    },
    contact: {
        type: String, 
    },
    jobsOffered : [{type : Schema.Types.ObjectId, ref : 'jobOpening'}]
},
    {
        timestamps: true
    }
);

export default mongoose.model('Recruiter', recruiterSchema);