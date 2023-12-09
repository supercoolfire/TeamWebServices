// Create the Time-Series Collection
db.createCollection("visitors", {
  timeseries: {
    timeField: "timestamp",
    metaField: "metadata",
    granularity: "minutes",
    expireAfterSeconds: 1036800 // Optional: Set TTL for 12 dyas
  }
});


// Insert Visitor Data
db.visitors.insertOne({
  timestamp: new Date(),
  metadata: { user: "example" },
  // other fields...
});


// Querying Time-Series Data
db.visitors.aggregate([
  {
    $match: {
      timestamp: { $gte: new Date("2023-01-01T00:00:00Z") }
    }
  },
  {
    $group: {
      _id: {
        $dateFromParts: {
          year: { $year: "$timestamp" },
          month: { $month: "$timestamp" },
          day: { $dayOfMonth: "$timestamp" },
          hour: { $hour: "$timestamp" },
          minute: { $minute: "$timestamp" }
        }
      },
      count: { $sum: 1 }
    }
  }
]);



// usage
app.get("/github/callback", passport.authenticate("github", {
  failureRedirect: "/api-docs", session: false
}),
  (req, res) => {
    req.session.user = req.user;
    mongodb.getDatabase().db().collection('visitors').insertOne({ 
      timestamp: new Date(), 
      metadata: { 
        user: req.user.username,
        displayName: req.user.displayName,
        login: req.user.username, // Ensure consistency with field name
        profileUrl: req.user.profileUrl,
        avatar_url: req.user.photos[0].value, // Adjust the path to get the avatar URL
      }
    });
    
    console.log(req.user)
    res.redirect("/");
  });
