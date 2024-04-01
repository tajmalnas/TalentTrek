import jwt from 'jsonwebtoken';
import Recruiter from "../models/recruiter.js";
import { sendEmail } from "../utils/email.js";
import { sendInterviewEmail } from "../utils/sendInterviewEmail.js";

export const sendEmails = async (req, res) => {
  const {emails : emails, token : token} = req.body;
  const recruiterId = jwt.verify(token, process.env.JWT_SECRET).id;
  console.log(recruiterId);
  const recruiter = await Recruiter.findById(recruiterId);
  const recruiterName = recruiter.username;
  const company = recruiter.company;
  const msg = sendEmail(emails, recruiterName, company);
  console.log(msg);
  return res.status(200).json({
    status : 200,
    msg : "Emails sent successfully"
  })
}

export const sendInterviewEmails = async(req, res) => {
  const {candidateEmail : candidateEmail, token : token, candidateId : candidateId} = req.body;
  const recruiterId = jwt.verify(token, process.env.JWT_SECRET).id;
  const recruiter = await Recruiter.findById(recruiterId);
  const recruiterName = recruiter.username;
  const company = recruiter.company;
  const recruiterEmail = recruiter.email;
  const msg = sendInterviewEmail(candidateId, candidateEmail, recruiterName, company, recruiterEmail);
  console.log(msg);
  return res.status(200).json({
    status : 200,
    msg : "Emails sent successfully"
  })
}
