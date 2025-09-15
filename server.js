//consts
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { render } = require('express/lib/response')

// the view engine I will use
app.set('view engine', 'ejs')

// for parsing form data, makes it eesier
app.use(bodyParser.urlencoded({ extended: true }))

// array to store posts
const posts = [];

// goes to createPost.ejs
app.get('/create', (req, res) => {
  res.render('createPost')
})

// handles form data from creatPost.ejs
app.post('/create', (req, res) => {
    const { title, author, content } = req.body;
    const newPost = {
        title,
        author,
        content,
        date: new Date().toLocaleDateString()
    };
    posts.push(newPost)
    res.redirect('/')
})

// sends user to index.ejs
app.get('/', (req, res) => {
    res.render('index', { posts: posts })
})

// post deleting 
app.post('/delete-post', (req, res) => {

    // finds array index from title
    const postTitle = req.body.postTitle;
    const postIndex = posts.findIndex(post => post.title === postTitle);

    // uses splice to remove the post so the array doesn't get all messed up
    if (postIndex !== -1) {
        posts.splice(postIndex, 1);
    }

    // redirects to index.ejs
    res.redirect('/');
});



app.listen(3000)


