const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: `${process.env.BASE_URL}/github/auth/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      // Verify user and create or retrieve from the database
      return done(null, profile);
    }
  )
);
