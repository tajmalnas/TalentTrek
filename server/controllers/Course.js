import jwt from 'jsonwebtoken';
import Creator from '../models/creator.js';
import Course from '../models/courses.js';
import Candidate from '../models/candidate.js';

const addCourse = async (req, res) => {
    const {
        token,
        name,
        description,
        image,
        skills,
        price,
    } = req.body;
    console.log("req.body",req.body)
    if (!token || !name || !description || !image || !skills || !price) {
        return res.status(400).json({ msg: 'All fields are required' });
    }
    try{
        const userId = jwt.verify(token, process.env.JWT_SECRET).id;
        console.log("userId",userId)
        const creator = await Creator.findById(userId);
        if (!creator) {
            return res.status(400).json({msg: 'user not found'});
        }
        const course = new Course({
            uploader: userId,
            name,
            description,
            image,
            skills,
            price,
            creator: userId
        });
        console.log("course",course)
        await course.save();
        creator.courseUploaded.push(course._id);
        await creator.save();
        return res.json({msg: 'Course added successfully', course: course});
    }catch(err){
        return res.status(500).json({msg: err.message});
    }
}

const getCourse = async (req, res) => {
    const { courseId } = req.body;
    if (!courseId) {
        return res.status(400).json({ msg: 'All fields are required' });
    }
    try{
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(400).json({msg: 'Course not found'});
        }
        return res.json(course);
    }
    catch(err){
        return res.status(500).json({msg: err.message});
    }
}

const addVideo = async (req, res) => {
    const { courseId, name, url } = req.body;
    if (!courseId || !name || !url) {
        return res.status(400).json({ msg: 'All fields are required' });
    }
    try{
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(400).json({msg: 'Course not found'});
        }
        course.videos.push({
            videoTitle: name,
            videoUrl: url
        });
        await course.save();
        return res.json({msg: 'Video added successfully', course: course});
    }
    catch(err){
        return res.status(500).json({msg: err.message});
    }
}

const getMyCreatedCourses = async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({ msg: 'All fields are required' });
    }
    try{
        const userId = jwt.verify(token, process.env.JWT_SECRET).id;
        const creator = await Creator.findById(userId);
        if (!creator) {
            return res.status(400).json({msg: 'user not found'});
        }
        const courses = await Course.find({uploader: userId});
        return res.json(courses);
    }
    catch(err){
        return res.status(500).json({msg: err.message});
    }
}

const addAIQuestions = async (req, res) => {
    const { courseId, inputQuestion } = req.body;
    if (!courseId || !inputQuestion) {
        return res.status(400).json({ msg: 'All fields are required' });
    }
    try{
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(400).json({msg: 'Course not found'});
        }
        course.aiTest.push({
            question:inputQuestion
        });
        await course.save();
        return res.json({msg: 'Question added successfully', course: course});
    }
    catch(err){
        return res.status(500).json({msg: err.message});
    }
}

const getAIQuestions = async (req, res) => {
    const { courseId } = req.body;
    if (!courseId) {
        return res.status(400).json({ msg: 'All fields are required' });
    }
    try{
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(400).json({msg: 'Course not found'});
        }
        return res.json(course.aiTest);
    }
    catch(err){
        return res.status(500).json({msg: err.message});
    }
}

const addFinalQuestions = async (req, res) => {
    const { courseId, inputQuestion, optionA, optionB, optionC, optionD, correctOption } = req.body;
    if (!courseId || !inputQuestion || !optionA || !optionB || !optionC || !optionD || !correctOption) {
        return res.status(400).json({ msg: 'All fields are required' });
    }
    try{
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(400).json({msg: 'Course not found'});
        }
        course.test.push({
            question:inputQuestion,
            options:[optionA,optionB,optionC,optionD],
            correctOption
        });
        await course.save();
        return res.json({msg: 'Question added successfully', course: course});
    }
    catch(err){
        return res.status(500).json({msg: err.message});
    }
}

const getFinalQuestions = async (req, res) => {
    const { courseId } = req.body;
    if (!courseId) {
        return res.status(400).json({ msg: 'All fields are required' });
    }
    try{
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(400).json({msg: 'Course not found'});
        }
        return res.json(course.test);
    }
    catch(err){
        return res.status(500).json({msg: err.message});
    }
}

const getAllCourses = async (req, res) => {
    try{
        const courses = await Course.find();
        return res.json(courses);
    }
    catch(err){
        return res.status(500).json({msg: err.message});
    }
}

const enrollInCourse = async (req, res) => {
    const { courseId, token } = req.body;
    if (!courseId || !token) {
        return res.status(400).json({ msg: 'All fields are required' });
    }
    try{
        const userId = jwt.verify(token, process.env.JWT_SECRET).id;
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(400).json({msg: 'Course not found'});
        }
        
        const candidate = await Candidate.findById(userId);
        if (!candidate) {
            return res.status(400).json({msg: 'User not found'});
        }
        candidate.coursesEnrolled.push(courseId);
        course.studentsEnrolled.push(userId);
        await candidate.save();
        await course.save();
    
        return res.json({msg: 'Enrolled successfully'});
    }
    catch(err){
        return res.status(500).json({msg: err.message});
    }
}

const myCourseCandidates = async (req, res) => {
    const {token} = req.body;
    if (!token) {
        return res.status(400).json({ msg: 'All fields are required' });
    }
    try{
        const userId = jwt.verify(token, process.env.JWT_SECRET).id;
        const courses = [];
        const candidate = await Candidate.findById(userId);
        if (!candidate) {
            return res.status(400).json({msg: 'User not found'});
        }
        for (let i = 0; i < candidate.coursesEnrolled.length; i++) {
            const course = await Course.findById(candidate.coursesEnrolled[i]);
            courses.push(course);
        }
        if (!courses) {
            return res.status(400).json({msg: 'Course not found'});
        }
        return res.json(courses);
    }
    catch(err){
        return res.status(500).json({msg: err.message});
    }   
}

export { 
    addCourse,
    getCourse,
    addVideo,
    getMyCreatedCourses,
    addAIQuestions,
    getAIQuestions,
    addFinalQuestions,
    getFinalQuestions,
    getAllCourses,
    enrollInCourse,
    myCourseCandidates
};
