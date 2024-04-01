import Creator from '../models/creator.js';
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
            const creator = await Creator.findById(userId);
            if (!creator) {
                return res.status(400).json({msg: 'user not found'});
            }
            creator.firstName = firstName;
            creator.lastName = lastName;
            creator.profilePicture = image;
            creator.company = company;
            creator.currentPosi = currentPosi;
            creator.about = about;
            creator.contact = contact;
            await creator.save();
            console.log("creator",creator)
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