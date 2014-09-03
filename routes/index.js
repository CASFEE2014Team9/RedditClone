var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  //res.render('index', { title: 'Express' });

    res.render('users/new');
});

router.get('/ratings/new', function(req, res) {
  //res.render('index', { title: 'Express' });

    res.render('ratings/new');
});

router.get('/posts/new', function(req, res) {
    res.render('posts/new');
});

module.exports = router;
