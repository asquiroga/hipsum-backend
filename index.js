const express = require('express');
const fetch = require('node-fetch');

var cors = require('cors')
var app = express()

app.use(cors())

/* List of tasks */
app.get('/tasks/:numberOfTasks', async (req, res) => {
    const endpoint = `https://hipsum.co/api/?type=hipster-centric&sentences=${req.params.numberOfTasks}`;
    const response = await fetch(endpoint);
    const data = await response.json();  
    
    const titles = data[0].split(". ");

    const tasks = titles.map((title, id) => ({id, title}) );
    res.send(tasks);
});

app.get('/complete/:id', (req, res) => {
    console.log(`Task completed: ${req.params.id}`);
    res.send({ completed: true });
});

app.listen(3050, () => console.log('Backend server up and running...'));