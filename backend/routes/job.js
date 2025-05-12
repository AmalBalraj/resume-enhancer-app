import express from 'express';
import {saveJobDesc} from '../utils/jobSaver.js'
import  fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

router.post('/', async (req, res) => {
  const data = req.body;
  const jobDescription = data.description;
  const pdfPath = await saveJobDesc(jobDescription); 
  console.log("inside post", pdfPath);
  let message = "";
  if (fs.existsSync(pdfPath)) {
      message = pdfPath;
  } else {
      message = "pdf path not found!!"
  }

  console.log("message",message);

  res.json({message:"succesfully sored data in DB", pdfPath:message});
});

router.get('/download', (req, res) => {
  console.log("triggered get")
  const filePath = path.resolve(__dirname, '../resources/resume-content/output/resume.pdf');
  console.log("Sending file from:", filePath);
  res.download(filePath, 'resume.pdf'); // triggers download with filename "resume.pdf"
});


export default router;