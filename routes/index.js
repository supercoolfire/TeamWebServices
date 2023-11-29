const passport = require('passport');

const router = require('express').Router();
const express = require('express');
const path = require('path');


router.use('/', require('./swagger'));

// router.get('/', (req, res) => {
//     //#swagger.tags = ['Hello World']
//     // res.send('Hello World');
//     res.sendFile(path.join(__dirname, '../frontend/index.html'));
// });

// Method 1
// router.get('/', (req, res) => { res.sendFile(path.join(__dirname, '../frontend/index.html')); });
// router.get('/TeamProjectProposal', (req, res) => { res.sendFile(path.join(__dirname, '../frontend/TeamProjectProposal.html')); });
// router.get('/module-embed-page.js', (req, res) => { res.sendFile(path.join(__dirname, '../frontend/module-embed-page.js')); });
// Method 2
router.use('/', express.static(path.join(__dirname, '../static/frontend')));
router.use('/TeamProjectProposal', express.static(path.join(__dirname, '../static/frontend/TeamProjectProposal.html')));

// router.use('/', require('./swagger'));
router.use('/review', require('./review'));
router.use('/song', require('./song'));
router.use('/store', require('./store'));
router.use('/user', require('./user'));
router.use('/github-auth', require('./githubRoute'));

// // Github oauth
const githubController = require('../controllers/githubController');
// router.use('/github-auth', express.static(path.join(__dirname, '../static/github-auth')));
router.use('/auth', githubController.auth);
router.use('/oauth-callback', githubController.oauthCallback);

module.exports = router;