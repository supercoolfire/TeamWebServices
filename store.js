const storeModel = require('../models/storeModel');

const getAllStores = async (req, res) => {
    console.log('inside getAll for stores');
    //#swagger.tags = ['stores']
    try {
        const stores = await storeModel.getAllStores();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(stores);
    } catch (error) {
        res.status(500).json(error.message || 'Some error occurred while fetching stores.');
    }
};

const getSingleStore = async (req, res) => {
    console.log('inside getSingle for store');
    //#swagger.tags = ['stores']
    const storeId = req.params.id;
    try {
        const store = await storeModel.getSingleStore(storeId);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(store);
    } catch (error) {
        res.status(500).json(error.message || 'Some error occurred while fetching the store.');
    }
};

const updateStore = async (req, res) => {
    console.log('inside update store');
    //#swagger.tags = ['stores']
    const storeId = req.params.id;
    const store = {
        name: req.body.name,
        url: req.body.url
    };

    try {
        await storeModel.updateStore(storeId, store);
        res.status(204).send();
    } catch (error) {
        res.status(500).json(error.message || 'Some error occurred while updating this store.');
    }
};

const deleteStore = async (req, res) => {
    console.log("inside delete stores");
    //#swagger.tags = ['stores']
    const storeId = req.params.id;

    try {
        const response = await storeModel.deleteStore(storeId);
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting this store.');
        }
    } catch (error) {
        res.status(500).json(error.message || 'Some error occurred while deleting this store.');
    }
};

const createStore = async (req, res) => {
    console.log("inside create stores");
    //#swagger.tags = ['stores']
    const store = {
        name: req.body.name,
        url: req.body.url
    };

    try {
        await storeModel.createStore(store);
        res.status(204).send();
    } catch (error) {
        res.status(500).json(error.message || 'Some error occurred while creating the store.');
    }
};

module.exports = {
    getAllStores,
    getSingleStore,
    createStore,
    updateStore,
    deleteStore
};
