// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Create express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Create comment object
const commentsByPostId = {};

// Create route for getting comments by post id
app.get('/posts/:id/comments', (req, res) => {
    // Get comments by post id
    res.send(commentsByPostId[req.params.id] || []);
});

// Create route for posting comments
app.post('/posts/:id/comments', (req, res) => {
    // Generate random id for comment
    const commentId = randomBytes(4).toString('hex');

    // Get comment content from request body
    const { content } = req.body;

    // Get comments by post id
    const comments = commentsByPostId[req.params.id] || [];

    // Add new comment to comments array
    comments.push({ id: commentId, content });

    // Update comments by post id
    commentsByPostId[req.params.id] = comments;

    // Send back comments array
    res.status(201).send(comments);
});

// Start web server
app.listen(4001, () => {
    console.log('Listening on 4001');
});