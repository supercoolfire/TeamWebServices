// githubModel.js
const mongodb = require('../data/database');

async function insertVisitorInformation(user) {
  try {
    const result = await mongodb
      .getDatabase()
      .db('music')
      .collection('visitors')
      .insertOne({
        timestamp: new Date(),
        metadata: {
          user: user.username,
          displayName: user.displayName,
          profileUrl: user.profileUrl,
          avatar_url: user.photos[0].value,
        },
      });

    return result.insertedId;
  } catch (error) {
    console.error("Error inserting visitor information:", error);
    throw error;
  }
}

module.exports = {
  insertVisitorInformation,
};
