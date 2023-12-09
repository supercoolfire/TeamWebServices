const express = require('express');
const router = express.Router();
const passport = require('passport');
const githubController = require('../controllers/githubController');

router.get("/callback", passport.authenticate("github", {
  failureRedirect: "/api-docs",
  session: false
}), githubController.handleGitHubCallback);

module.exports = router;
