import React from "react";


const UserResume = (props) => {
    const handleFormSubmit = (event) => {
        event.preventDefault();
    }

    return(
        <div>
            <form onSubmit={handleFormSubmit}>
                <input type="text" />
                <button type="submit">Upload</button>
            </form>
        </div>
    )
}

export default UserResume;