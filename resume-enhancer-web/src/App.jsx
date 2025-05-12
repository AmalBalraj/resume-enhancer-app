import { useState } from 'react'
import './App.css'
import './components/job-desciption/JobDescription'
import JobDescription from './components/job-desciption/JobDescription'
import ResumeOutput from './components/resume-out/ResumeOut'
import UserResume from './components/user-resume/UserResume'


//get data from description component, then take the data and pass it to resume component
function App() {
    const [resumeContent, setResumeContent] = useState("");

    const getUpdatedResumeContent = async (content) => {
        try {
            console.log(content)
            const response = await fetch('http://localhost:3000/jobs', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({description: content}),
            })
            
            if(!response.ok){
                throw new Error("Failed to post decription");
            }
            

            const result = await response.json();
            console.log('server response', result.pdfPath);
            setResumeContent(result.pdfPath);
        } catch (error) {
            console.log('error saving job description',error);
        }
    };

    
      

    return (
        <div className='app-home'>
            <div className='home-navbar'>navbar</div>
            <div className='home-body'>
                <div className='home-left-div'>
                    <UserResume/>
                    <JobDescription onSubmit={getUpdatedResumeContent}/>
                </div>
                <div className='home-right-div'>
                    <ResumeOutput resumeContent={resumeContent}/>    
                </div>
            </div>

        </div>
    )

}

export default App
