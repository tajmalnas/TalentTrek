import jwt from 'jsonwebtoken'
import FinalTestClassroom from '../models/finalTestClassroom.js';

const addFinalTestClassroom = async (req, res) => {
    const {token,classroomId,marks,totalMarks} = req.body;
    if (!classroomId || !token || !totalMarks) {
        return res.status(400).json({ msg: 'All fields are required' });
    }
    try{
        const studentId = jwt.verify(token, process.env.JWT_SECRET).id;
        const finalTest = new FinalTestClassroom({
            classroomId,
            studentId,
            marks,
            totalMarks
        });
        await finalTest.save();
        return res.json({msg: 'Test added successfully', finalTestClassroom: finalTest});
    }
    catch(err){
        return res.status(500).json({msg: err.message});
    }
}

export {addFinalTestClassroom}