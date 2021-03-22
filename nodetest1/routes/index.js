var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Hello, world! page. */
router.get('/helloworld', function(req, res, next) {
  res.render('helloworld', { title: 'Hello, world!'});
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({},{},function(e,docs){
    res.render('userlist', {
      "userlist" : docs
    });
  });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
  res.render('newuser', {title: 'Add a new user'});
});

/* POST to add user service */
router.post('/adduser', function(req, res) {
  // set internal DB variable
  var db = req.db;

  // get form values.  these rely on the "name" attribute
  var userName = req.body.username;
  var userEmail = req.body.useremail;

  // set the collection
  var collection = db.get('usercollection');

  // finally, submit to the DB
  collection.insert({
    "username" : userName,
    "email" : userEmail
  }, function (err, doc) {
    if (err) {
      // if the insert failed, return an error
      res.send("There was an error inserting the username and email to the database.");
    }
    else {
      // no error, forward to the success page
      res.redirect("userlist");
    }
  });
});

module.exports = router;
