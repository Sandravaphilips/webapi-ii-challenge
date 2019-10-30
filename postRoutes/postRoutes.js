const express = require('express');
const db = require('../data/db');

const router = express.Router();

router.post('/', createNewPost);
router.post('/:id/comments', postCommentById);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.get('/:id/comments', getCommentsById);
router.delete('/:id', deletePost);
router.put('./:id', updatePost);

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

function getAllPosts(req, res) {
    db.find()
    .then(data => {
        console.log(data)
    })
    .catch(err => console.log(err))
}

function getPostById(req, res) {
    const {id} = req.params;

    db.findById(id)
    .then(data => {
        console.log(data)
    })
    .catch(err => console.log(err))
}

function getCommentsById(req, res) {
    const {id} = req.params;

    db.find(id)
    .then(data => {
        console.log(data)
    })
    .catch(err => console.log(err))
}

function deletePost(req, res) {
    const {id} = req.params;

    const postToDelete = db.findById(id);

    db.remove(id)
    .then(data => {
        console.log(data)
        console.log(postToDelete)
    })
    .catch(err => console.log(err))
}

function updatePost(req, res) {
    const {id} = req.params;
    const postToUpdate = {
        title: req.body.title,
        contents: req.body.contents
    }

    db.update(id, postToUpdate)
    .then(data => {
        console.log(data)
        db.findById(id)
    })
    .catch(err => console.log(err))
}

module.exports = router;