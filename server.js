const express = require('express');

const server = express();

const dataRouter = require('./dataRouter');

server.use(express.json());

server.use('/api/posts', dataRouter);

server.get('/', (req, res) => {
    res.send(`
        <h2>Building RESTful APIs with Express</h2>
        `);
});

module.exports = server;