import Candidate from '../models/candidate.js';
import jwt from 'jsonwebtoken';
import OpenAI from 'openai';

const checkAnswer = async (req, res) => {
    const openai = new OpenAI()
    openai.api_key = process.env.OPENAI_API_KEY;
    const {token, notesStore} = req.body;
    console.log(req.body);
    if(!token || !notesStore){
        return res.status(400).json({msg: 'All fields are required'});
    }
    try{
        if(token){
            const userId = jwt.verify(token, process.env.JWT_SECRET).id;
            console.log("userId",userId);
            const candidate = await Candidate.findById(userId);
            if (!candidate) {
                return res.status(400).json({msg: 'user not found'});
            }

            let prompt = notesStore.map(note => note.question + "\n" + note.answer).join("\n");
            prompt = "The following is a conversation with an AI interviewer. The interviewer is a GPT-3.5 model.Give the candidate marks out of 100 in this assesment and the also short analysis of performace of candidate.Give response in this format marks=x/100 and short analysis in next line .The interviewer is asking the candidate about the following questions: \n" + prompt + "\n\n\n";


            const response = await openai.chat.completions.create({
                messages:[
                    {
                        role: 'system',
                        content: prompt
                    }
                ],
                model: 'gpt-3.5-turbo',
            });
            
            const responseContent = response.choices[0].message.content;
            
            const marksRegex = /marks=(\d+\/\d+)/;
            let analysis = responseContent.replace(marksRegex, '').trim();

            let marksMatch = responseContent.match(marksRegex);
            let secondMarksRegex = /Marks=(\d+\/\d+)/;
            if(marksMatch === null){
                marksMatch = responseContent.match(secondMarksRegex);
                analysis = responseContent.replace(secondMarksRegex, '').trim();
            }
            const marks = marksMatch[1];

                        
            console.log("Marks:", marks);
            console.log("Analysis:", analysis);

            return res.json({ msg: 'profile updated successfully', marks, analysis });
        }
        else{
            return res.status(400).json({msg: 'token not found'});
        }
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
};

export { checkAnswer };
