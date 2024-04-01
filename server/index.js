import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Auth from './routes/auth.js';
import Recruiter from './routes/Recruiter.js';
import Candidate from './routes/Candidate.js';
import Creator from './routes/creator.js';
import JobOpening from './routes/jobOpening.js';
import AIInterview from './routes/Ai-Interview.js';
import createSchedule from './routes/schedule.js'
import candidateJob from './routes/candidateJob.js';
import Stripe from 'stripe';
import Profile from './routes/Profile.js';
import sendEmails from './routes/sendEmails.js';
import createTemplate from './routes/createTemplate.js'
import Feedback from './routes/Feedback.js'
import Code from './routes/code.js'
import Course from './routes/Course.js'


dotenv.config();
const stripe = Stripe(process.env.SECRET_KEY);

const app = express();
app.use(cors());    
app.use(express.json());

const PORT = 5000;

mongoose.connect(process.env.MONGO_KEY).then(() => {
    console.log('Connected to database');
}).catch(() => {
    console.log('Connection failed');
}
);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/auth', Auth);

app.use('/recruiter', Recruiter);
app.use('/candidate', Candidate);
app.use('/creator',Creator);

app.use('/job', JobOpening);
app.use('/schedule', createSchedule);
app.use('/candidate/job', candidateJob);

app.post("/checkout", async(req, res) => {
    try{
        const session  = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items:req.body.items.map(item => {
                return{
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: item.name
                        },
                        unit_amount: item.price * 100
                    },
                    quantity: item.quantity
                }
            }),
            success_url: 'http://localhost:5173/success',
            cancel_url: 'http://localhost:5173/cancel',
        });
        console.log(session);
        res.json({url : session.url, sessionId: session.id});
    }catch(error){
        res.status(500).json({error : error.message});
    }
});

app.use('/profile', Profile);
app.use('/ai-interview',AIInterview);
app.use('/send-emails', sendEmails);
app.use('/template', createTemplate);
app.use('/feedback',Feedback)
app.use('/code-editor',Code)

app.use('/course',Course)

app.listen(PORT, () => {
    console.log(`Server listening on port : ${PORT}`);
})