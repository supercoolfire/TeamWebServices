const express = require('express');
const router = express.Router();
const githubRoute = require('./githubRoute');
const passport = require('passport');
const path = require('path');
const overrideMiddleware = require('./override');

// Middleware to set the message based on the user's login status
router.use((req, res, next) => {
  if (req.session.user !== undefined) {
    // console.log(`req.session.user: ${req.session.user}`);
    if (req.session.user.displayName !== null) {
      // console.log(`req.session.user.displayName: ${req.session.user.displayName}`);
      res.locals.message = `Logged in as ${req.session.user.displayName}`;
    } else {
      // console.log(`req.session.user.username: ${req.session.user.username}`);
      res.locals.message = `Logged in as ${req.session.user.username}`;
    }
  } else {
    if (req.session.goodbye == true) {
      res.locals.message = 'Thank you for visiting. You are successfully logged out!';
      // console.log(`1 res.locals.message: ${res.locals.message}`);
      req.session.goodbye = false;
    } else {
      // console.log(`0 res.locals.message: ${res.locals.message}`);
      res.locals.message = "Register now, it's FREE!";
    }
  }
  // console.log(res.locals.message);

  next();
});

router.use('/', require('./swagger'));
router.use('/github', githubRoute);
router.use(overrideMiddleware);
router.use('/review', require('./review'));
router.use('/song', require('./song'));
router.use('/store', require('./store'));
router.use('/user', require('./user'));
// router.use('/criteria', require('./criteriaRoute'));

router.get("/", (req, res) => {
  // console.log("req.session:", req.session);
  // console.log("req.user:", req.user);

  // Store the intended destination in the session
  if (req.session.returnTo !== undefined) {
    req.session.returnTo = req.headers.referer || '/';
  } else {
    req.session.returnTo = '/';
  }

  // Rest of your route handling logic
  res.render('frontend/index', {
    message: res.locals.message,
    req
  });
});

router.get("/github-auth", (req, res, next) => {
  if (req.session.user) {
    // console.log('github-auth if:')
    // console.log(req.session.user)
    // blank if undefined
    profilePic = req.session.user.photos[0].value || '';
    isAuthorized = true;
    if (req.session.user.displayName == null) {
      res.locals.message = `Logged in as ${req.session.user.username}`;
    } else {
      res.locals.message = `Logged in as ${req.session.user.displayName}`;
    }
  } else {
    // console.log('github-auth else:')
    // console.log(req.user)
    isAuthorized = false;
    profilePic = '/images/github.png';
  }

  // console.log(`auth res.locals.message: ${res.locals.message}`);
  if (req.session.returnTo.includes("github/callback")) {
    req.session.returnTo = '/github-auth';
  } else if (req.session.returnTo == '/github-auth') {
    req.session.returnTo = '/';
  }
  // console.log(`auth req.session.returnTo: ${req.session.returnTo}`);

  const data = {
    title: 'Login to github',
    message: res.locals.message,
    isAuthorized: isAuthorized,
    user: req.user,
    req: req,
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

router.get("/logout", function (req, res, next) {
  req.session.goodbye = true;
  // req.logout((err) => {
  //   if (err) {
  //     return next(err);
  //   }
  // })
  req.session.user = undefined;
  console.log(`logout req.session.goodbye: ${req.session.goodbye}`)
  res.redirect("/");
});


module.exports = router;