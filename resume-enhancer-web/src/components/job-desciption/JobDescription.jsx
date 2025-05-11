import 'react'
import {createElement, useState} from 'react';


function JobDescription() {

    const [buttonText, setButtonText] = useState("Submit");
    const [textValue, setTextValue] = useState();

    const saveJobDescription = async (content) => {
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
            console.log('server response', result.resumeContent);
        } catch (error) {
            console.log('error saving job description',error);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("Button Clicked")
        setButtonText("waiting");
        saveJobDescription(textValue)
    }

    return (
        <div>
            <div className='job-heading'>JOB </div>
            <form onSubmit={handleFormSubmit}>
                <input className='job-description-content' type="text" value={textValue} onChange={ (e) => setTextValue(e.target.value)}/>
                <button type='submit'>
                    {buttonText}</button>
            </form>
        </div>
    )
}

export default JobDescription;
