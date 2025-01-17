/*
 * Created by: Jayser Pilapil
 * Copyleft 2023 Jayser Pilapil. All rights reserved.
 * anyone or anytwo or anywho or anywhat is allowed to use this code.
 * Used in CSE341: Web Services
 * 
 * 
 * database:
 {
  "login": "myusername",
  "role": "god",
 }
 * if use are using userName instead of login, replace
 mongodb.getDatabase().db().findOne({ login: username });
 * with 
 mongodb.getDatabase().db().findOne({ userName: username });
 *
 * 
 * Sample usage:
const { isAuthenticated, isGod, isAdmin, isModerator } = require('../middleware/authenticate');

router.get('/', isAuthenticated, usersController.getAllUsers);
 * 
 *
 * If you are not using app.set('view engine', 'ejs');
 * replace
 res.status(status).render('frontend/index', data);
 * with
 res.redirect("/");
 * 
 * frontend/index is in the folder where app.use(express.static('static')); declared
 * 
 */
const mongodb = require('../data/database'); // Update the path as needed

function filterAPI(req, res, status, message) {
  const data = {
    message: message,
    req: req,
  };
  res.status(status).render('frontend/index', data);
}

async function getUserRole(username) {
  try {
    const rolesCollection = mongodb.getDatabase().db().collection('roles');
    const userRole = await rolesCollection.findOne({ login: username });

    return userRole ? userRole.role : null;
  } catch (error) {
    console.error('Error fetching user role from MongoDB:', error);
    return null;
  }
}

function authenticateAccessLevel(requiredLevel) {
  return async (req, res, next) => {
    const user = req.session.user;

    if (!user || !user.username) {
      filterAPI(req, res, 401, 'Unauthorized: You need to login.');
    } else {
      const userRoles = {
        god: 4,
        admin: 3,
        moderator: 2,
        authenticated: 1,
      };

      // Fetch user's role from MongoDB
      const userRole = await getUserRole(user.username);

      console.log(`User Role: ${userRole}, Required Role: ${requiredLevel}`);

      if (userRole && typeof userRoles[requiredLevel] === 'number') {
        // Check if the user's role level is equal or higher than the required level
        if (userRoles[userRole] >= userRoles[requiredLevel]) {
          // User has the required access level, proceed to the next middleware or route
          next();
        } else {
          // User does not have the required access level
          filterAPI(req, res, 403, 'Forbidden: Insufficient access level.');
        }
      } else {
        // Unable to fetch user role or invalid required level
        filterAPI(req, res, 500, 'Internal server error.');
      }
    }
  };
}

// Exporting the middleware and access level constants as an object
module.exports = {
  isAuthenticated: authenticateAccessLevel('authenticated'),
  isGod: authenticateAccessLevel('god'),
  isAdmin: authenticateAccessLevel('admin'),
  isModerator: authenticateAccessLevel('moderator'),
};
