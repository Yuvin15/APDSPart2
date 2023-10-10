const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// Get all posts
router.get('/get', (req, res) => {
    Post.find().then((posts) => {
        res.json({
            message: 'Posts Found',
            posts: posts
        });
    });
});

// Create a post
router.post('', (req, res) => {
    const post = new Post (


        {
            Imageid:      req.body.Imageid,
            Imagecaption: req.body.Imagecaption,
            likes:        req.body.likes,
            ImageUrl:     req.body.ImageUrl    
        }
    )
    post.save();
    res.status(201).json({
        message: 'Post created',
        post:post
    })
})

// Delete a post
router.delete('/delete', async (req, res) => {
    try {
        const Imageid = req.body.Imageid;

        // Check if Imageid is valid
        if (!Imageid) {
            return res.status(400).json({ message: 'Imageid is required' });
        }

        const deletedPost = await Post.findOneAndDelete({ Imageid });

        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;