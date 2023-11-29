const router = require('express').Router();
const express = require('express');
const path = require('path');

const githubController = require('../controllers/githubController');
router.use('/', express.static(path.join(__dirname, '../static/github-auth')));
router.use('/auth', githubController.auth);
router.use('/oauth-callback', githubController.oauthCallback);


module.exports = router;
