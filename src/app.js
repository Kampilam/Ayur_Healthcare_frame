const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const JOBS = require('./jobs');

const app = express();
app.use(express.static(path.join(__dirname, 'css')))

// Configure mustache
app.set('views', `${__dirname}/templates`);
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());

app.get('/', (req, res) => {
    res.render('index', { jobs: JOBS});
})

app.get('/jobs', (req, res) => {
    res.render('jobs', { jobs: JOBS});
})

app.get('/services', (req, res) => {
    res.render('services', { jobs: JOBS});
})

app.get('/payments', (req, res) => {
    res.render('payments', { jobs: JOBS});
})

app.post('/job/:id/apply', (req, res) => {
    res.send("got the application");
})

app.get('/job/:id', (req, res) => {
    const id = req.params.id;
    const matchedJob = JOBS.find(job => job.id.toString() === id);
    res.render('job', { job: matchedJob});
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on https://localhost:${port}`);
})