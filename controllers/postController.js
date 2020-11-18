const Post = require('../models/post');
const Subscriber = require('../models/subscriber');
const Message = require('../models/message');
const mongoose = require('mongoose');

//get success page
exports.success_get = (req, res, next) => {
    const submissionType = req.query.submission;
    (err) => {
        if (err) { return next(err); }
    }

    if (submissionType == 'email') {
        res.render('success', ({ title: 'Success', message: 'subscribed to my newsletter' }));
    }
    else if (submissionType == 'contact') {
        res.render('success', ({ title: 'Success', message: 'sent me a message' }));
    }
}

//get list of posts
exports.posts_list = (req, res, next) => {
    Post.find()
        .populate('post')
        .sort([['date_added', 'descending']])
        .exec((err, allPosts) => {
            if (err) { return next(err) }
            res.render('posts_list', { title: 'All Posts', posts_list: allPosts })
        });
}

//get specific post
exports.post_get = (req, res, next) => {
    const post_id = mongoose.Types.ObjectId(req.params.id);

    Post.findById(post_id)
        .exec((err, post) => {
            if (err) { return next(err) }
            if (results == null) {
                //render error page instead
                const err = new Error('Page does not exist');
                err.status = 404;
                return next(err);
            }
            res.render('readpost', { title: post.title, post: post, comments: post.comments });
        })
}

//get create post form
exports.create_post_get = (req, res, next) => {
    res.render('createpost', { title: 'New Post' });
}

//post create post form
exports.create_post_post = (req, res, next) => {
    //form sanitisation

    //get and store data
    const newPost = new Post(
        { _id: new mongoose.Types.ObjectId },
        { title: req.body.title },
        { post: req.body.blogpost }
    )
    newPost.save((err) => {
        if (err) { return next(err); }
        res.redirect('/posts');
    });
    console.log(newPost.url);
}

//post create comment form
exports.add_comment = (req, res, next) => {
    //sanitise form

    //get and store data
    id = mongoose.Types.ObjectId(req.params.id);

    Post.findById(id)
        .exec((err, post) => {
            if (err) { return next(err); }
            post.comments.author = req.body.name;
            post.comments.comment = req.body.comment;
            post.save();

            res.redirect(post.url);
        })
}

//post contact form, then get success page
exports.contact_post = (req, res, next) => {
    //sanitize and handle errors

    //get and store data
    console.log(req.body);
    const message = new Message(
        { name: req.body.name },
        { email: req.body.email },
        { message: req.body.messsage }
    )

    message.save((err) => {
        if (err) { return next(err); }
        res.redirect('/success?submission=contact');
    })

}

//post email subscription form, then get success page
exports.email_subscription = (req, res, next) => {
    //sanitize and handle errors

    //get and store data
    const subscriber = new Subscriber(
        { email: req.body.email }
    )

    subscriber.save((err) => {
        if (err) { return next(err); }
        res.redirect('/success?submission=email');
    })
}

//edit post
exports.update_post = (req, res, next) => {
    res.send('underway');
}

//delete post
exports.delete_post = (req, res, next) => {
    res.send('underway');
}
