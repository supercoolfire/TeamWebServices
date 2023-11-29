const express = require('express');
const router = express.Router();

const usersController = require('../controllers/user');

const validation = require('../middleware/validate');

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getSingleUser);

router.post('/', validation.validateUser, usersController.createUser);
router.put('/:id', validation.validateUser, usersController.updateUser);

router.delete('/:id', usersController.deleteUser);


module.exports = router;