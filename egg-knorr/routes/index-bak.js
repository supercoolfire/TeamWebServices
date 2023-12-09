const express = require('express');
const router = express.Router();
const githubRoute = require('../../routes/githubRoute');
const passport = require('passport');
const path = require('path');
const overrideMiddleware = require('../../routes/override');

// Middleware to set the message based on the user's login status
router.use((req, res, next) => {
  if (req.session.user) {
    console.log(`req.session.user: ${req.session.user}`);
    if (req.session.user.displayName) {
      console.log(`req.session.user.displayName: ${req.session.user.displayName}`);
      username = req.session.user.displayName;
    } 
    else if (req.session.user.username) {
      console.log(`req.session.user.username: ${req.session.user.username}`);
      username = req.session.user.username;
    } else {
      console.log('unknown')
      username = 'unknown';
    }
    req.session.message = `Logged in as ${username}`;
  } else {
    console.log("Register now, it's FREE!")
    req.session.message = "Register now, it's FREE!";
  }
  
  next();
});

router.use('/', require('../../routes/swagger'));
router.use('/github', githubRoute);
router.use(overrideMiddleware);
router.use('/review', require('../../routes/review'));
router.use('/song', require('../../routes/song'));
router.use('/store', require('../../routes/store'));
router.use('/user', require('../../routes/user'));

router.get("/", (req, res) => {
  // console.log("req.session:", req.session);
  // console.log("req.user:", req.user);

  // Store the intended destination in the session
  req.session.returnTo = req.headers.referer || '/';

  // Rest of your route handling logic
  res.render('frontend/index', { message: req.session.message, req });
});

router.get("/github-auth", (req, res, next) => {
  if (req.session.user) {
    // console.log('github-auth if:')
    // console.log(req.session.user)
    profilePic = req.session.user.photos[0].value;
    isAuthorized = true;
  } else {
    // console.log('github-auth else:')
    // console.log(req.user)
    isAuthorized = false;
    profilePic = '/images/github.png';
  }

  const data = {
    title: 'Login to github',
    message: req.session.message,
    isAuthorized: isAuthorized,
    user: req.user,
    req: req ,
    returnTo: req.session.returnTo,
    profilePic: profilePic
  };
  
  // console.log('github-auth data:')
  // console.log(data)
  res.render('github-auth/index', data);
});


router.get("/login", (req, res, next) => {
  
  // Redirect to GitHub for authentication
  passport.authenticate("github")(req, res, next);
});

router.get("/logout", function(req, res, next){
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).send("Internal Server Error");
      }

      // Clear the session cookie
      res.clearCookie("connect.sid");
      res.redirect("/");
    });
  } else {
    // Session does not exist, redirect to home
    res.redirect("/");
  }
});


module.exports = router;