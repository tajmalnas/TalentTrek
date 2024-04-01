import bcrypt from 'bcryptjs';
import { errorHandler } from '../middlewares/error.js';
import Candidate from '../models/candidate.js';
import Recruiter from '../models/recruiter.js';
import Creator from '../models/creator.js';
import jwt from 'jsonwebtoken';

const signup = async (req, res,next) => {
    const {username, email, password,role} = req.body;
    console.log(req.body);
    if (!username || !email || !password || !role) {
        next(errorHandler(400, 'All fierolelds are required'));
        return;
    }
    try {
        if(role!=="candidate" && role!=="recruiter" && role!=="creator"){
            next(errorHandler(400, 'Invalid role'));
            return;
        }

        if(role==="creator"){
            const creator = await Creator.findOne({email})
            if (creator) {
                return res.status(400).json({msg: 'creator already exists'});
            }
            const hashedPassword = bcrypt.hashSync(password, 10);
            const newCreator = new Creator({
                username,
                email,
                password: hashedPassword, 
                role:role
            });

            await newCreator.save()
            res.json({msg: 'user added successfully'});
        }
        
        else if(role==="candidate"){
            const candidate = await Candidate.findOne({email})
            if (candidate) {
                return res.status(400).json({msg: 'candidate already exists'});
            }
            const hashedPassword = bcrypt.hashSync(password, 10);
            const newCandidate = new Candidate({
                username,
                email,
                password: hashedPassword, 
                role:role
            });

            await newCandidate.save()
            res.json({msg: 'user added successfully'});
        }
        else{
            const recruiter = await Recruiter.findOne({email})
            if (recruiter) {
                return res.status(400).json({msg: 'recruiter already exists'});
            }
            const hashedPassword = bcrypt.hashSync(password, 10);
            const newRecruiter = new Recruiter({
                username,
                email,
                password: hashedPassword,
                role:role 
            });

            await newRecruiter.save()
            res.json({msg: 'user added successfully'});
        }
        
    } catch (error) {
        next(error);
        return;
    }
}


const login = async (req, res, next) => {
    const {email, password} = req.body;
    if (!email || !password) {
        next(errorHandler(400, 'All fields are required'));
    }
    try {   
            const creator = await Creator.findOne({
                email
            });
            if (creator) {
                const validPassword = bcrypt.compareSync(password, creator.password);
                if (!validPassword) {
                    next(errorHandler(400, 'Invalid passord'));
                    return;
                }
                const {password: pass, ...rest} = creator._doc;
                console.log(rest);
                const token = jwt.sign({id:creator._id.toString()},process.env.JWT_SECRET,{expiresIn: '1d'})
                console.log("token",token)
                res.json({msg: 'Login successful', token:token,user:rest,role:rest.role});
                return;
            }

            const candidate = await Candidate.findOne({
                email
            });
            
            if(candidate){
                const validPassword = bcrypt.compareSync(password, candidate.password);
                if (!validPassword) {
                    next(errorHandler(400, 'Invalid passord'));
                    return;
                }
                const {password: pass, ...rest} = candidate._doc;
                console.log(rest);
                const token = jwt.sign({
                    id:candidate._id.toString()
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d'
                })
                console.log("token",token)
                res.json({msg: 'Login successful', token:token,user:rest,role:rest.role});
                return;
            }

            const recruiter = await Recruiter.findOne({
                email
            });
            if (!recruiter) {
                next(errorHandler(400, 'Invalid credentials'));
                return;
            }
            else{
                const validPassword = bcrypt.compareSync(password, recruiter.password);
                if (!validPassword) {
                    next(errorHandler(400, 'Invalid passord'));
                    return;
                }
                const {password: pass, ...rest} = recruiter._doc;
                console.log(rest);
                const token = jwt.sign({
                    id:recruiter._id.toString()
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d'
                })
                console.log("token",token)
                res.json({msg: 'Login successful', token:token, user : rest, role:rest.role});
                return;
            }
    }
    catch (error) {
        next(errorHandler(500, 'Internal server error'));
        return;
    }
}

const google = async (req,res,next) => {
    const {username, email, googlePhotoUrl,role} = req.body;
    try{
        if(username==="" || email==="" || googlePhotoUrl===""){
            next(errorHandler(400, 'All fields are required'));
            return;
        }

        if(role===""){
            const creator = await Creator.findOne({email});
            if(creator){
                const token = jwt.sign({id:creator._id},process.env.JWT_SECRET,{expiresIn: '1d'})
                const {password, ...rest} = creator._doc;
                res.json({msg: 'Login successful', token:token, user:rest,role:rest.role});
                return;
            }

            const candidate = await Candidate.findOne({email});
            if(candidate){
                const token = jwt.sign({id:candidate._id},process.env.JWT_SECRET,{expiresIn: '1d'})
                const {password, ...rest} = candidate._doc;
                res.json({msg: 'Login successful', token:token, user:rest,role:rest.role});
                return;
            }
            const recruiter = await Recruiter.findOne({email});
            if(recruiter){
                const token = jwt.sign
                ({id:recruiter._id},process.env.JWT_SECRET,{expiresIn: '1d'})
                const {password, ...rest} = recruiter._doc;
                res.json({msg: 'Login successful', token:token, user:rest,rest:rest.role});
                return;
            }
        }

        if(role==="creator"){
            const creator = await Creator.findOne({email});
            if(creator){
                const token = jwt.sign({id:creator._id},process.env.JWT_SECRET,{expiresIn: '1d'})
                const {password, ...rest} = creator._doc;
                res.json({msg: 'Login successful', token:token, user:rest,role:rest.role});
            }
            else{
                const generatedPassword = email+1234;
                const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
                const name = username.toLowerCase().split(' ').join('')
                const newCreator = new Creator({
                    username: name,
                    email,
                    password: hashedPassword,
                    profilePicture: googlePhotoUrl,
                    role:role
                });
                newCreator.save()
                const token = jwt.sign({id:newCreator._id.toString()},process.env.JWT_SECRET,{expiresIn: '1d'})
                const {password, ...rest} = newCreator._doc;
                res.json({msg: 'User added successfully', token:token, user:rest,role:rest.role});
            }
        }

        else if(role==="candidate"){
            const candidate = await Candidate.findOne({email});
            if(candidate){
                const token = jwt.sign({id:candidate._id},process.env.JWT_SECRET,{expiresIn: '1d'})
                const {password, ...rest} = candidate._doc;
                res.json({msg: 'Login successful', token:token, user:rest,role:rest.role});
            }
            else{
                const generatedPassword = email+1234;
                const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
                const name = username.toLowerCase().split(' ').join('')
                const newCandidate = new Candidate({
                    username: name,
                    email,
                    password: hashedPassword,
                    profilePicture: googlePhotoUrl,
                    role:role
                });
                newCandidate.save()
                const token = jwt.sign({id:newCandidate._id.toString()},process.env.JWT_SECRET,{expiresIn: '1d'})
                const {password, ...rest} = newCandidate._doc;
                res.json({msg: 'User added successfully', token:token, user:rest,role:rest.role});
            }
        }
        else{
            const recruiter = await Recruiter.findOne({email});
            if(recruiter){
                const token = jwt.sign
                ({id:recruiter._id},process.env.JWT_SECRET,{expiresIn: '1d'})
                const {password, ...rest} = recruiter._doc;
                res.json({msg: 'Login successful', token:token, user:rest,role:rest.role});
            }
            else{
                const generatedPassword = email+1234;
                const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
                const name = username.toLowerCase().split(' ').join('')
                const newRecruiter = new Recruiter({
                    username: name,
                    email,
                    password: hashedPassword,
                    profilePicture: googlePhotoUrl,
                    role:role
                });
                newRecruiter.save()
                const token = jwt.sign({id:newRecruiter._id.toString()},process.env.JWT_SECRET,{expiresIn: '1d'})
                const {password, ...rest} = newRecruiter._doc;
                res.json({msg: 'User added successfully', token:token, user:rest,role:rest.role});
            }
        }
    }catch(error){
        next(errorHandler(500, 'Internal server error'));
        return;
    }
}

export{ signup, login, google};