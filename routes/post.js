const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// Get all posts
router.get('', (req, res) => {
    Post.find().then((posts) => {
        res.json({
            message: 'Posts Found',
            posts: posts
        });
    });
});

// Create a post
router.post('', (req, res) => {
    const post = new Post({
        Imageid: req.body.id,
        Imagecaption: req.body.caption,
        likes: req.body.likes,
        ImageUrl: req.body.imgUrl
    });
    post.save().then(() => {
        res.status(201).json({
            message: "Post created",
            post: post
        });
    });
});

// Delete a post
router.delete('/:Imageid', (req, res) => {
    const Imageid = req.params.Imageid;

    Post.findByIdAndDelete(Imageid)
        .then(deletedPost => {
            if (!deletedPost) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.json({ message: 'Post deleted successfully' });
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
});

module.exports = router;
