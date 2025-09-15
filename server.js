//consts
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { render } = require('express/lib/response')

// view engine
app.set('view engine', 'ejs')

// for parsing form data
app.use(bodyParser.urlencoded({ extended: true }))

// array to store posts
const posts = [];

app.get('/create', (req, res) => {
  res.render('createPost')
})

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

app.get('/', (req, res) => {
    res.render('index', { posts: posts })
})

// post deleting 
app.post('/delete-post', (req, res) => {
    
    const postTitle = req.body.postTitle;

    
    const postIndex = posts.findIndex(post => post.title === postTitle);

    if (postIndex !== -1) {
        posts.splice(postIndex, 1);
    }

    res.redirect('/');
});


app.listen(3000)