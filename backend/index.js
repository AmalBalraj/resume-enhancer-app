import express from 'express';
import cors from 'cors';
import jobRouter from './routes/job.js'

const app = express();

const PORT = 3000;

app.use(cors())
app.use(express.json());


//mount job router on path
app.use('/jobs', jobRouter);

app.listen(PORT, () => {
    console.log(`express server listening on PORT:${PORT}`);
})

