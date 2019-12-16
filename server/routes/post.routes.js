const express = require('express');
const router = express.Router();


const PostController = require('../controllers/post.controller');

// get all posts
router.route('/posts').get(PostController.getPosts);

//get single post - singlePost exercise
router.route('/posts/:id').get(PostController.getSinglePost);

//add new post exercise
router.route('/posts').post(PostController.addPost);

// get posts by range - pagination exercise
router.route('/posts/range/:startAt/:limit').get(PostController.getPostsByRange);


module.exports = router;