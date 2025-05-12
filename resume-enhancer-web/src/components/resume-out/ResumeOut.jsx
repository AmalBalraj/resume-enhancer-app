import './resumeOut.css'

function ResumeOutput({resumeContent}){

    const handleDownload = async () => {
        try {
            const response = await fetch('http://localhost:3000/jobs/download', {
                method: 'GET',
            });
            
        
            if (!response.ok) throw new Error('Download failed');
        
            const blob = await response.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));
        
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'resume.pdf'); // File name
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    return(
        <div>
            <div className="resume-header"><h2>Resume Output</h2></div>
            <div className="resume-body"><pre>{resumeContent}</pre></div>
            <button onClick={handleDownload}>Download Resume</button>
        </div>
    )
}

export default ResumeOutput;