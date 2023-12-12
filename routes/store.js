const express = require('express');
const router = express.Router();

const storesController = require('../controllers/store');
const { validateStores } = require('../middleware/validate-stores');
const { isAuthenticated, isGod, isAdmin, isModerator } = require('../middleware/authenticate');


router.get('/', isAuthenticated, storesController.getAllStores);
router.get('/:id', isAuthenticated, storesController.getSingleStore);
router.post('/', isAuthenticated, validateStores, storesController.createStore);
router.put('/:id', isAuthenticated, validateStores, storesController.updateStore);
router.delete('/:id', isAuthenticated, storesController.deleteStore);


module.exports = router;