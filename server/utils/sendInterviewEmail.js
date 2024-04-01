import nodemailer from "nodemailer";
//we need an array of emails
const sendInterviewEmail = (candidateId, candidateEmail, recruiterName, company, recruiterEmail) => {
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587, 
      auth: {
        user: process.env.SMTP_USER, 
        pass: process.env.SMTP_PASSWORD,
      },
    });
    
    // Define email content
    let mailOptions = {
      from: "ryanrego14@gmail.com",
      to: `${candidateEmail}, ${recruiterEmail}`,
      subject: `Congratulations! You are moving forward to the final interview round.`,
      html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <p>Dear Candidate,</p>
              <p>I trust this message finds you well. I am pleased to inform you that your profile has successfully advanced to the next stage in our hiring process. Congratulations on this notable achievement!</p>
              <p>Your skills and experiences have captured our attention, and we are eager to understand more about how you can contribute to our team.</p>
              <p>The interview schedule will be communicated to you shortly. Please keep an eye on your email for further details.</p>
              <p>Meet Link : https://localhost:3000/meeting/${candidateId}</p>
              <p>Best regards,<br>
              ${recruiterName}<br>
              ${company}</p>
          </div>
      `,
  };
  
    
    transporter.sendInterviewEmail(mailOptions, (error, info) => {
      // console.log(mailOptions);
      if (error) {
        return 500;
      } else {
        console.log("Email sent:", info.response);
        return 200;
      }
    });      
}

export {sendInterviewEmail};