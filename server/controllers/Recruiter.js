import Recruiter from '../models/recruiter.js';
import jwt from 'jsonwebtoken';

const updateProfile = async (req, res) => {
    const {
      token,
      firstName,
      lastName,
      image,
      company,
      currentPosi,
      about,
      contact
    } = req.body;
    console.log(req.body);
    if (!token || !firstName || !lastName || !company || !currentPosi || !about || !contact) {
        return res.status(400).json({msg: 'All fields are required'});
    }
    try {
        if(token){
            const userId = jwt.verify(token, process.env.JWT_SECRET).id;
            console.log("userId",userId)
            const recruiter = await Recruiter.findById(userId);
            if (!recruiter) {
                return res.status(400).json({msg: 'user not found'});
            }
            recruiter.firstName = firstName;
            recruiter.lastName = lastName;
            recruiter.profilePicture = image;
            recruiter.company = company;
            recruiter.currentPosi = currentPosi;
            recruiter.about = about;
            recruiter.contact = contact;
            await recruiter.save();
            console.log("recruiter",recruiter)
            res.json({msg: 'profile updated successfully'});
        }
        else{
            return res.status(400).json({msg: 'token not found'});
        }
    } catch (error) {
        return res.status(500).json({msg: 'something went wrong'});
    }
}

export  {updateProfile};