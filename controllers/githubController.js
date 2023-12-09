// githubController.js
const githubModel = require('../models/githubModel');

async function handleGitHubCallback(req, res) {
  try {
    req.session.user = req.user;

    const insertedId = await githubModel.insertVisitorInformation(req.user);

    if (insertedId) {
      console.log("Visitor information inserted successfully:", insertedId);

      const data = {
        title: 'Login to GitHub',
        message: req.session.message,
        isAuthorized: true,
        user: req.user,
        req: req,
        returnTo: req.session.returnTo,
        profilePic: req.user.photos[0].value,
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
}

module.exports = {
  handleGitHubCallback,
};