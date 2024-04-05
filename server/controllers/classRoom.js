import jwt from 'jsonwebtoken';
import ClassroomModel from '../models/classroom.js';
import Creator from '../models/creator.js';
import Candidate from '../models/candidate.js';

// Generate a classroom code of size 6
const generateClassroomCode = () => {
    let code = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const codeLength = 6;
    
    for (let i = 0; i < codeLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
    }
    
    return code;
};

export const createClassroom = async (req, res) => {
    const { token, name, description, image, skills } = req.body;
    const creator = jwt.verify(token, process.env.JWT_SECRET).id;
    const creatorModel = await Creator.findById(creator);
    const classRoomCode = generateClassroomCode();
    const newClassroom = new ClassroomModel({
        name,
        description,
        image,
        skills,
        creator,
        classRoomCode,
    });
    console.log(newClassroom);
    try {
        await newClassroom.save();
        creatorModel.classroomCreated.push(newClassroom._id);
        await creatorModel.save();
        res.status(201).json({
            message: 'Classroom created successfully',
            classroom: newClassroom,
        });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//get the classroom by classroom code
export const getClassroom = async (req, res) => {
    const { classRoomCode } = req.body;
    try {
        const classroom = await ClassroomModel.findById(classRoomCode);
        res.status(200).json({ classroom });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addVideo = async (req, res) => {
    const { classRoomCode , videoTitle, videoUrl } = req.body;
    if (!classRoomCode || !videoTitle || !videoUrl) {
        return res.status(400).json({ msg: 'All fields are required' });
    }
    try{
        const classRoom = await ClassroomModel.findById(classRoomCode);
        if (!classRoom) {
            return res.status(400).json({msg: 'Classroom not found'});
        }
        classRoom.videos.push({
            videoTitle: videoTitle,
            videoUrl: videoUrl
        });
        await classRoom.save();
        return res.json({msg: 'Video added successfully', classRoom: classRoom});
    }
    catch(err){
        return res.status(500).json({msg: err.message});
    }
}

export const getEnrolledClassroom = async (req, res) => {   
    const { token } = req.body;
    const candidateId = jwt.verify(token, process.env.JWT_SECRET).id;
    const candidate = await Candidate.findById(candidateId);
    const classroomIds = candidate.classroomEnrolled;
    const classrooms = await ClassroomModel.find({ _id: { $in: classroomIds } });
    res.status(200).json({ classrooms });
}

export const enrollCandidate = async (req, res) => {
    const { token, classCode } = req.body;
    const candidateId = jwt.verify(token, process.env.JWT_SECRET).id;
    const candidate = await Candidate.findById(candidateId);
    const classroom = await ClassroomModel.findOne({ classRoomCode: classCode });
    if (!classroom) {
        return res.status(400).json({ msg: 'Classroom not found' });
    }
    if (classroom.creator == candidateId) {
        return res.status(400).json({ msg: 'You are the creator of this classroom' });
    }
    if (classroom.students.includes(candidateId)) {
        return res.status(400).json({ msg: 'You are already enrolled in this classroom' });
    }
    classroom.students.push(candidateId);
    candidate.classroomEnrolled.push(classroom._id);
    await classroom.save();
    await candidate.save();
    return res.json({ msg: `Enrolled successfully`, classroom: classroom });
}

export const viewClassroom = async (req, res) => {
    const { classRoomCode } = req.body;
    try {
        const classroom = await ClassroomModel.findOne({ classRoomCode });
        res.status(200).json({ classroom });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}