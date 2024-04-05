import jwt from 'jsonwebtoken';
import Creator from '../models/creator.js';
import Course from '../models/courses.js';

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

export { addCourse, getCourse,addVideo,getMyCreatedCourses};