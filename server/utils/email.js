// import nodemailer from "nodemailer";
// //we need date of the interview, timings, receipent
// //receipentName, receipentEmail
// //interview Date, time
// const sendEmail = (recipentEmail, recipentName, interviewDate, interviewTime) => {

//     let transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST,
//       port: 587, 
//       auth: {
//         user: process.env.SMTP_USER, 
//         pass: process.env.SMTP_PASSWORD,
//       },
//     });
    
//     // Define email content
//     let mailOptions = {
//       from: "Team OneLost",
//       to: `${recipentEmail}`, 
//       subject: `Congratulations! You have been shorlisted for the interview.`, 
//       html: `
//             <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//                 <p>Dear ${recipentName},</p>
//                 <p>I trust this message finds you well. I am pleased to inform you that your profile has successfully advanced to the next stage in our hiring process. Congratulations on this notable achievement!</p>
    
//                 <p>Your skills and experiences have captured our attention, and we are eager to understand more about how you can contribute to our team.</p>
//                 <p>Your interview details are </p>
//                 <p>Date : ${interviewDate}</p>
//                 <p>Time : ${interviewTime}</p>
//                 <p>Time Zone : IST</p>
//                 <p>Best regards,<br>
//                 Team OneLost<br>
//                 AlphaByte, PCCoE</p>
//             </div>
//         `,
//     };
    
//     // Send email
//     transporter.sendMail(mailOptions, (error, info) => {
//       console.log(mailOptions);
//       if (error) {
//         console.error("Error occurred:", error);
//       } else {
//         console.log("Email sent:", info.response);
//       }
//     });      
// }

// export {sendEmail};













import nodemailer from "nodemailer";
//we need an array of emails
const sendEmail = (emails, recruiterName, company) => {
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
      to: `${emails[0]}, ${emails[1]}`,
      subject: `Congratulations! You are moving forward to the AI interview round.`,
      html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <p>Dear Candidate,</p>
              <p>I trust this message finds you well. I am pleased to inform you that your profile has successfully advanced to the next stage in our hiring process. Congratulations on this notable achievement!</p>
              <p>Your skills and experiences have captured our attention, and we are eager to understand more about how you can contribute to our team.</p>
              <p>The interview schedule will be communicated to you shortly. Please keep an eye on your email for further details.</p>
              <p>Best regards,<br>
              ${recruiterName}<br>
              ${company}</p>
          </div>
      `,
  };
  
    
    transporter.sendMail(mailOptions, (error, info) => {
      // console.log(mailOptions);
      if (error) {
        return 500;
      } else {
        console.log("Email sent:", info.response);
        return 200;
      }
    });      
}

export {sendEmail};