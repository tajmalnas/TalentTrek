import jobOpening from "../models/jobOpening.js";

export const createSchedule = async(req, res) => {
    const {startDate, endDate, startTime, endTime, interval, breakDuration} = req.body;

    return res.status(200).json({
        msg : `Scheduled SuccessFully`
    })
} 