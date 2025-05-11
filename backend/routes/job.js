import express from 'express';
import {saveJobDesc} from '../utils/jobSaver.js'


const router = express.Router();

router.post('/', async (req, res) => {
  const data = req.body;
  const jobDescription = data.description;
  const resumeContent = await saveJobDesc(jobDescription);  
  res.json({message:"succesfully sored data in DB", resumeContent:resumeContent});
});


export default router;