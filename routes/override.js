const router = require('express').Router();
const express = require('express');

router.use((req, res, next) => {
    const queryParameter = req.query.role;
    if (queryParameter) {
        console.log(`Role query parameter found: ${queryParameter}`)
        // Check if the 'role' query parameter is present and has the value 'moderator'
        if (req.query.role === 'admin' && !req.session.user) {
            req.session.user = {}
            req.session.user = { username: 'theadmin' }
            return res.redirect(req.originalUrl);
        }
    
        if (req.query.role === 'moderator' && !req.session.user) {
            req.session.user = {}
            req.session.user = { username: 'themoderator' }
            return res.redirect(req.originalUrl);
        }
    
        if (req.query.role === 'guest' && !req.session.user) {
            req.session.user = {}
            req.session.user = { username: 'Earthling' }
            return res.redirect(req.originalUrl);
        }
    }

    // Continue to the next middleware if not redirecting
    next();
});

module.exports = router;