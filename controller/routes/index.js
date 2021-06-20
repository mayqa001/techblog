const router = require('express').Router();
const { Post, Comment, User } = require('../../model');

router.get('/', async (req, res) => {
  try {
    // Pass serialized data and session flag into template

    // Get all posts from the db
    const posts = Post.findAll({
      include: Comment,
    });

    if(posts != null) {
      console.log('----------------------------------------------------');
      console.log('Posts found!');
      console.log('----------------------------------------------------');
    }

    res.render('home', {
      logged_in: req.session.logged_in,
      posts: posts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;