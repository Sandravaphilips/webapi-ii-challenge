const express = require('express');
const db = require('../data/db');

const router = express.Router();



const createNewPost = async(req, res) => {
    const newPost = {
        title: req.body.title,
        contents: req.body.contents
    }

    try {
        if(!newPost.title || !newPost.contents) {
            return res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        } else {
            const newPostId = await db.insert(newPost)
            const completeNewPost = await db.findById(newPostId.id)
            return res.status(201).json(completeNewPost)
        }
    } catch {
        return res.status(500).json({ error: "There was an error while saving the post to the database" })
    }

    
}

const postCommentById = async(req, res) => {
    const {id} = req.params
    const newComment = {
        text: req.body.text,
        post_id: id
    }

    try {
        const post = await db.findById(id)
        if(!newComment.text) {
            return res.status(400).json({ errorMessage: "Please provide text for the comment." })
        } else if(!post) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {
            const newCommentId = await db.insertComment(newComment)
            const completeNewComment = await db.findCommentById(newCommentId.id)
            return res.status(201).json(completeNewComment)
        }
    } catch {
        return res.status(500).json({ error: "There was an error while saving the post to the database" })
    }

    
}

function getAllPosts(req, res) {
    db.find()
    .then(data => {
        res.status(200).json(data)
    })
    .catch(() => res.status(500).json({ error: "The posts information could not be retrieved." }))
}

function getPostById(req, res) {
    const {id} = req.params;

    db.findById(id)
    .then(data => {
        if(!data) {
            return res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
        res.status(200).json(data)
    })
    .catch(() => res.status(500).json({ error: "The post information could not be retrieved." }))
}

function getCommentsById(req, res) {
    const {id} = req.params;

    db.findPostComments(id)
    .then(data => {
        if(!data) {
            return res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
        return res.status(200).json(data)
    })
    .catch(() => res.status(500).json({ error: "The comments information could not be retrieved." }))
}

const deletePost = async(req, res) => {
    const {id} = req.params;

    try {
        const postToDelete = await db.findById(id)
        if(!postToDelete) {
            return res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {
            await db.remove(id)
            return res.status(200).json(postToDelete)
        }
    } catch {
        return res.status(500).json({ error: "The post could not be removed." })
    }

    
}

const updatePost = async(req, res) => {
    const {id} = req.params;
    const postToUpdate = {
        title: req.body.title,
        contents: req.body.contents
    }

    try {
        let post = await db.findById(id)
        if(!post) {
            return res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
        else if (!postToUpdate.title || !postToUpdate.contents) {
            return res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        } else {
            await db.update(id, postToUpdate)
            post = await db.findById(id)
            return res.status(200).json(post)
        }
    } catch {
        return res.status(500).json({ error: "The post information could not be modified." })
    }

    
}

router.post('/', createNewPost);
router.post('/:id/comments', postCommentById);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.get('/:id/comments', getCommentsById);
router.delete('/:id', deletePost);
router.put('/:id', updatePost);

module.exports = router;