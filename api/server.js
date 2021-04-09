const express = require('express');
const morgan = require('morgan');
const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');

const server = express();

// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.use(express.json());
server.use(morgan('dev'));

server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

server.get('/', (req, res) => {
    res.send(`
        <h3>Projects/Actions API is running</h3>
    `);
})

module.exports = server;
