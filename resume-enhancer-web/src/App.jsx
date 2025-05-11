import './App.css'
import './components/job-desciption/JobDescription'
import JobDescription from './components/job-desciption/JobDescription'
import ResumeOutput from './components/resume-out/resume-out'


//get data from description component, then take the data and pass it to resume component
function App() {
    return (
        <div className='app-home'>
            <div className='home-navbar'>navbar</div>
            <div className='home-body'>
                <div className='home-left-div'>
                    <JobDescription/>
                </div>
                <div className='home-right-div'>
                    <ResumeOutput data={{message:'sample data'}}/>    
                </div>
            </div>

        </div>
    )

}

export default App
