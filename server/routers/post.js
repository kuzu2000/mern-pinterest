const express = require('express')
const router = express.Router()
const Post = require('./../models/post')
const {verifyToken} = require('./../middleware/auth')
const mongoose = require("mongoose");
//search Post 
router.get('/search', async (req, res) => {
    const searchQuery = req.query.searchQuery;
    try {
      const title = new RegExp(searchQuery, 'i')
      const posts = await Post.find({title});
      res.status(200).json(posts)
    } catch (error) {    
      res.status(404).json({ message: error.message });
  }
})
// get Posts
router.get('/', async (req, res) => {
    const searchQuery = req.query.searchQuery;
  const title = new RegExp(searchQuery, 'i');
  let posts
    try {
        if (searchQuery) {
            posts = await Post.find({title: {$regex: title}})
        } else {
            posts = await Post.find()
        }

        res.json(posts);
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
})

router.get('/user-post', verifyToken, async (req, res) => {
    const posts = await Post.find({user: String(req.user.id)})
    if(posts.length > 0) {
        res.status(200).json(posts)
    }  else {
        res.status(400).json({ message: "You haven't posted" })
    }
})

// get Post
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const post = await Post.findById(id)
        const populatedPost = await post.populate('user comments.name', {username: 1})
        res.status(200).json(populatedPost)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})
// create Post
router.post('/', verifyToken, async (req,res) => {
    const post = req.body;
    const newPost = new Post({...post})
    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
})



//comment Post
router.post('/:id/comment', verifyToken, async (req, res) => {
    const {id} = req.params;
    const comment = {
        name: req.user.id,
        comment: req.body.comment,
      };
    const post = await Post.findById(id);
    post.comments.push(comment);
    let updatedPost = await post.save();
    const populatedPost = await updatedPost.populate('comments.name', {
        username: 1,
        email: 1,
      });
    res.json(populatedPost);
})


// delete Post
module.exports = router