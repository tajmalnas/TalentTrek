import jwt from 'jsonwebtoken'
import FinalTest from '../models/finalTest.js'

const addFinalTest = async (req, res) => {
    const {courseId,token,marks,totalMarks} = req.body;
    if (!courseId || !token || !marks || !totalMarks) {
        return res.status(400).json({ msg: 'All fields are required' });
    }
    try{
        const studentId = jwt.verify(token, process.env.JWT_SECRET).id;
        const finalTest = new FinalTest({
            courseId,
            studentId,
            marks,
            totalMarks
        });
        await finalTest.save();
        return res.json({msg: 'Test added successfully', finalTest: finalTest});
    }
    catch(err){
        return res.status(500).json({msg: err.message});
    }
}

export {addFinalTest}