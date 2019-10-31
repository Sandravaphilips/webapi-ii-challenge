require('dotenv').config();
const express = require('express');
const cors = require('cors');
const postRoutes = require('./postRoutes/postRoutes');
const port = process.env.PORT;

const server = express();

server.use(express.json());
server.use(cors());
server.use('/api/posts', postRoutes);

server.get('*', handleDefaultRequest)

function handleDefaultRequest(req, res) {
    res.json('hello world')
}

server.listen(port, () => {
    console.log('listening on ' + port);
})