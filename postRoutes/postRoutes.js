const express = require('express');
const db = require('../data/db');

const router = express.Router();

router.post('/', createNewPost);
router.post('/:id/comments', postCommentById);

function createNewPost(req, res) {
    const newPost = {
        title: req.body.title,
        contents: req.body.contents
    }

    db.insert(newPost)
    .then(data => {
        console.log(data)
    })
    .catch(err => console.log(err))
}

function postCommentById(req, res) {
    const newComment = {
        text: req.body.text
    }

    db.insertComment(newComment)
    .then(data => {
        console.log(data)
    })
    .catch(err => console.log(err))
}