var express = require('express');
var app = express();
var post = express();
var comment = express();

post.on('mount', function (parent) {
    console.log(parent.mountpath); // '/'
});

comment.on('mount', function (parent) {
    console.log(parent.mountpath); // '/post'  
});

app.use('/post', post);
post.use('/comment', comment);

console.log(app.path()); // '' 
console.log(post.path()); // '/post
console.log(comment.path()); //'/post/comment'