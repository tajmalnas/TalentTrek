import Code from '../models/code.js';
import WebSocket from 'ws';

const CodeEditor = async(req, res) => {
    const { userId, code } = req.body;
    try {
        const newCode = await Code.findById(userId);
        if(newCode){
            const newCode1 = newCode.updateOne({
                code: code
            });
            await newCode1.save();
            res.status(201).json(newCode1);
        } else {
            const newCode2 = new Code({ userId, code });
            await newCode2.save();
            res.status(201).json(newCode2);
        }
        
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}    

export {CodeEditor};