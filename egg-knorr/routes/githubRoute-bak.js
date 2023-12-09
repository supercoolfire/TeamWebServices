const express = require('express');
const router = express.Router();
const mongodb = require('../../data/database'); 
const path = require('path');
const passport = require('passport');

router.get("/callback", passport.authenticate("github", {
    failureRedirect: "/api-docs", session: false
  }), async (req, res) => {
      req.session.user = req.user;
      const result = await mongodb.getDatabase().db('music').collection('visitors').insertOne({
      timestamp: new Date(),
      metadata: {
        user: req.user.username,
        displayName: req.user.displayName,
        profileUrl: req.user.profileUrl,
        avatar_url: req.user.photos[0].value,
      },
    });
    
    console.log("MongoDB Insert Result:", result);
    
    if (result.insertedId) {
      console.log("Visitor information inserted successfully:", result);
      // Redirect logic...
    } else {
      console.error("Error inserting visitor information: No documents were inserted");
      res.status(500).send("Internal Server Error");
    }
      
    // console.log(req.user)
    res.redirect("/github-auth");
  });

module.exports = router;
