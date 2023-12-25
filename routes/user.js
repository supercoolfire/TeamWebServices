const express = require('express');
const router = express.Router();

const usersController = require('../controllers/user');
const { validateUser } = require('../middleware/validate-user');
// const { accessLevel } = require('../middleware/authenticate-accessLevel');
const { isAuthenticated, isGod, isAdmin, isModerator } = require('../middleware/authenticate');

router.get('/', isAuthenticated, usersController.getAllUsers);
router.get('/:id', isAuthenticated, usersController.getSingleUser);

router.post('/', isAuthenticated, validateUser, usersController.createUser);
// router.post('/', accessLevel(3), validateUser, usersController.createUser);
router.put('/:id', isAuthenticated, validateUser, usersController.updateUser);

router.delete('/:id', isAdmin, usersController.deleteUser);


module.exports = router;