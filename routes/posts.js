const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

//GET list of all posts
router.get('/', postController.posts_list);

//GET specific post
router.get('/:id', postController.post_get);

//POST form for adding comment
router.post('/:id', postController.add_comment);

module.exports = router;