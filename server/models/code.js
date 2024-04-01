import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const codeSchema = new Schema({
    userId:{
        type: String,
        required: true,
    },
    code:{
        type: String,
        required: true,
    },
},
    {
        timestamps: true
    }
);

export default mongoose.model('Code', codeSchema);