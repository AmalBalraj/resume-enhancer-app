import 'react'
import {createElement, useState} from 'react';


function JobDescription({onSubmit}) {

    const [buttonText, setButtonText] = useState("Submit");
    const [textValue, setTextValue] = useState();

    

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("Button Clicked")
        setButtonText("waiting");
        onSubmit(textValue)
    }

    return (
        <div>
            <div className='job-heading'><h2>JOB</h2></div>
            <form onSubmit={handleFormSubmit}>
                <input className='job-description-content' type="text" value={textValue} onChange={ (e) => setTextValue(e.target.value)}/>
                <button type='submit'>
                    {buttonText}</button>
            </form>
        </div>
    )
}

export default JobDescription;
