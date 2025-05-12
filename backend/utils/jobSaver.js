import { promises as fs } from 'fs';
import generateAIResponse from '../utils/gemini.js'
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
r
const RESOURCES_DIR = path.join(__dirname, '../resources');
const RESUME_DIR = path.join(RESOURCES_DIR, 'resume-content')
const OUTPUT_DIR = path.join(RESUME_DIR, 'output');

//main function
export const saveJobDesc = async (content) => {
    const separator = '\n---------------\n';

    // 1. Save original job description
    await appendToFile(path.join(RESOURCES_DIR, 'example.txt'), content + separator);

    // 2. Get updated resume content from AI
    const aiResume = await generateAIResponse(content);
    await appendToFile(path.join(RESOURCES_DIR, 'output.txt'), aiResume + separator);

    // 3. Convert LaTeX to PDF
    const latexCode = await fs.readFile(path.join(RESOURCES_DIR, 'myresume-sample.txt'), 'utf-8');
    try {
        const pdfPath = await compileLatexToPdf(latexCode, 'resume');
        console.log('PDF generated:', pdfPath);
        return pdfPath;
    } catch (err) {
        console.error('PDF generation failed:', err);
        return null;
    }
}

// Appends content to a file
async function appendToFile(filePath, content) {
    try {
        await fs.appendFile(filePath, content);
        console.log(`Written to ${filePath}`);
    } catch (err) {
        console.error(`Failed to write to ${filePath}`, err);
    }
}

// Compiles LaTeX code to PDF and returns the path
function compileLatexToPdf(latexCode, fileName) {
    return new Promise(async (resolve, reject) => {
        const texFilePath = path.join(RESUME_DIR, `${fileName}.tex`);
        const pdfPath = path.join(OUTPUT_DIR, `${fileName}.pdf`);

        try {
            await fs.mkdir(OUTPUT_DIR, { recursive: true });
            await fs.writeFile(texFilePath, latexCode);
        } catch (err) {
            return reject(new Error('Failed to prepare LaTeX file'));
        }

        exec(`pdflatex -output-directory=${OUTPUT_DIR} ${texFilePath}`, (err, stdout, stderr) => {
            if (err) return reject(new Error(stderr));
            resolve(pdfPath);
        });
    });
}



// export const saveJobDesc = async (content) => {
//     content = content + '\n' + '---------------' + '\n'
//     fs.appendFile('./resources/example.txt', content,(err) => {
//         if(err){
//             console.log("Error saving file", err);
//             return;
//         }
//         console.log("File write success");
//     })

//     let newResumeContent = await  generateAIResponse(content);
//     newResumeContent = newResumeContent + '\n' + '---------------' + '\n'
//     fs.appendFile('./resources/output.txt', newResumeContent,(err) => {
//         if(err){
//             console.log("Error saving file", err);
//             return;
//         }
//         console.log("File write success");
//     })
//     const pdfPath = resumeConverter("latexCode", "this job may be okay");
//     console.log(pdfPath);
//     return pdfPath;
// }

// function resumeConverter(latexCode, jobDescription){
//     latexCode = fs.readFileSync('./resources/myresume-sample.txt','utf8'); 
//     const fileName = 'resume';
//     const texFilePath = path.join(__dirname, `../resources/resume-content/${fileName}.tex`);
//     const outputDir = path.join(__dirname, '../resources/resume-content/output');

//     if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

//     // Write LaTeX code to a .tex file
//     fs.writeFileSync(texFilePath, latexCode);

//     // Compile using pdflatex
//     exec(`pdflatex -output-directory=${outputDir} ${texFilePath}`, (err, stdout, stderr) => {
//         if (err) {
//             console.error(stderr);
//             return res.status(500).send('Compilation error');
//         }

//         const pdfPath = path.join(outputDir, `${fileName}.pdf`);
//         return pdfPath;
//         if (fs.existsSync(pdfPath)) {
//             res.sendFile(pdfPath);
//         } else {
//             res.status(500).send('PDF not generated');
//         }
//     });
//     //take latex resume, provide to model, prompt to 
//     //prompt: optimize this latex resume {latexResume} for this job {jobDesciption}
//     //latexResumeNew = model.give(prompt)
//     //compile output latexResumeNew
//     //return pdf for download
//     //showcase pdf and give download button  
// }
