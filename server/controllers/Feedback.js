import Feedback from '../models/feedback.js';
export const FeedbackData = async (req, res) => {

    const { userId, name, email, message } = req.body;

    try {
        const newFeedback = new Feedback({ userId, name, email, message });

        await newFeedback.save();

        res.status(201).json(newFeedback);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}    

export const getFeedback = async (req, res) => {
    const { userId } = req.body;
    if(!userId){
        return res.status(400).json({message: "User Id is required"});
    }
    try {
        const feedback = await Feedback.find({ userId });
        res.status(200).json(feedback);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}