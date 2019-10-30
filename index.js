
const express = require('express');
const cors = require('cors');
const postRoutes = require('./postRoutes/postRoutes')

const server = express();

server.use(express.json());
server.use(cors());
server.use('/api/posts', postRoutes);

server.get('*', handleDefaultRequest)

function handleDefaultRequest(req, res) {
    res.json('hello world')
}

server.listen(process.env.PORT || 5000, () => {
    console.log('listening on ' + (process.env.PORT || 5000));
})