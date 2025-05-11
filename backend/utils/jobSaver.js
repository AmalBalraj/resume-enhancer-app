import fs from 'fs';
import generateAIResponse from '../utils/gemini.js'

export const saveJobDesc = async (content) => {
    content = content + '\n' + '---------------' + '\n'
    fs.appendFile('./resources/example.txt', content,(err) => {
        if(err){
            console.log("Error saving file", err);
            return;
        }
        console.log("File write success");
    })

    let newResumeContent = await  generateAIResponse(content);
    newResumeContent = newResumeContent + '\n' + '---------------' + '\n'
    fs.appendFile('./resources/output.txt', newResumeContent,(err) => {
        if(err){
            console.log("Error saving file", err);
            return;
        }
        console.log("File write success");
    })

    return newResumeContent;
}

function resumeConverter(latexResume, jobDescription){
    //take latex resume, provide to model, prompt to 
    //prompt: optimize this latex resume {latexResume} for this job {jobDesciption}
    //latexResumeNew = model.give(prompt)
    //compile output latexResumeNew
    //return pdf for download
    //showcase pdf and give download button  
}
