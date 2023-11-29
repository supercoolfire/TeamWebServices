const express = require('express');
const router = express.Router();

const storesController = require('../controllers/store');


router.get('/', storesController.getAllStores);
router.get('/:id', storesController.getSingleStore);
router.post('/', storesController.createStore);
router.put('/:id', storesController.updateStore);
router.delete('/:id', storesController.deleteStore);


module.exports = router;