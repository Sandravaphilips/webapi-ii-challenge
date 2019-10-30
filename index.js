
const express = require('express');
const cors = require('cors');
const db = require('./data/db')

const server = express();

server.use(express.json());
server.use(cors());

function handleDefaultRequest(req, res) {
    res.json('hello world')
}

server.listen(process.env.PORT || 5000, () => {
    console.log('listening on ' + (process.env.PORT || 5000));
})