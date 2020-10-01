const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// GET home page
router.get('/', function(req, res) {
  res.render('index', { title: 'My Blog' });
});

//POST form for email subscription
router.post('/subscribe', postController.email_subscription);

// POST Contact Form
router.post('/', postController.contact_post);

//GET success page
router.get('/success', postController.success_get);

//GET form for creating post
router.get('/newpost', postController.create_post_get);

//POST form for creating post
router.post('/newpost', postController.create_post_post);


module.exports = router;
