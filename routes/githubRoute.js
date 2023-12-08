const express = require('express');
const router = express.Router();
const mongodb = require('../data/database'); 
const path = require('path');
const passport = require('passport');

router.get("/callback", passport.authenticate("github", {
  failureRedirect: "/api-docs",
  session: false
}), async (req, res) => {
  try {
    req.session.user = req.user;

    // Insert visitor information into the database
    const result = await mongodb.getDatabase().db('music').collection('visitors').insertOne({
      timestamp: new Date(),
      metadata: {
        user: req.user.username,
        displayName: req.user.displayName,
        profileUrl: req.user.profileUrl,
        avatar_url: req.user.photos[0].value,
      },
    });

    if (result.insertedId) {
      console.log("Visitor information inserted successfully:", result);

      const data = {
        title: 'Login to github',
        message: req.session.message,
        isAuthorized: true,
        user: req.user,
        req: req,
        returnTo: req.session.returnTo,
        profilePic: req.user.photos[0].value
      };

      // Redirect to the desired location (adjust the URL accordingly)
      res.render('github-auth/index', data);
    } else {
      console.error("Error inserting visitor information: No documents were inserted");
      res.status(500).send("Internal Server Error");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;
