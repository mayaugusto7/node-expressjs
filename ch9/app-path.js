var express = require('express');
var app = express();
var post = express();
var comment = express();

app.use('/post', post);
post.use('/comment', comment);

console.log(app.path()); // ''
console.log(post.path()); // '/post'
console.log(comment.path()); // '/comment'