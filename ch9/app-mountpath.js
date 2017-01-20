var express = require('express');
var app = express();
var post = express();
var comment = express();

app.use('/post', post);
app.use('/comment', comment);

console.log(app.mountpath); //''
console.log(post.mountpath); // '/post
console.log(comment.mountpath); // '/comment