const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllStores = async (req, res) => {
    console.log('inside getAll for stores');
    //#swagger.tags = ['stores']
    const result = await mongodb.getDatabase().db('music').collection('store').find();
    result.toArray().then((stores) => {
        res.setHeader('Content-Type', 'application/json');
        res.Status(200).json(stores);
    });
};

const getSingleStore = async (req, res) => {
    console.log('inside getSingle for store');
    //#swagger.tags = ['stores']
    const storeId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('music').collection('store').find({ _id: storeId });
    result.toArray().then((stores) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(stores[0]);
    });
};

const updateStore = async (req, res) => {
    console.log('inside update store');
    //#swagger.tags = ['stores']
    const storeId = new ObjectId(req.params.id);
    const store = {
        name: req.body.name,
        url: req.body.url
    };
    const response = await mongodb.getDatabase.db('music').collection('store').replaceOne( { _id: storeId });
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating this store');
    }
};

const deleteStore = async (req, res) => {
    console.log("inside delete stores");
    //#swagger.tags = ['stores']
    const storeId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('music').collection('store').deleteOne( { _id: storeId });
    if (response.deletedCount > 0 ) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting this store.');
    }
};

const createStore = async (req, res) => {
    console.log("inside create stores");
    //#swagger.tags = ['stores']
    const store = {
        title: req.body.title,
        artist: req.body.artist        
    };
    const response = await mongodb.getDatabase().db('music').collection('store').insertOne( store );
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the store.');
    }
};

module.exports = {
    getAllStores,
    getSingleStore,
    createStore,
    updateStore,
    deleteStore
};
