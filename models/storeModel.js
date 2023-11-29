const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllStores = async () => {
    const result = await mongodb.getDatabase().db('music').collection('store').find();
    return result.toArray();
};

const getSingleStore = async (storeId) => {
    const result = await mongodb.getDatabase().db('music').collection('store').find({ _id: new ObjectId(storeId) });
    const stores = await result.toArray();
    return stores[0];
};

const updateStore = async (storeId, store) => {
    if (!store.name || !store.url) {
        throw new Error('Name and URL are required fields.');
    }

    const response = await mongodb.getDatabase().db('music').collection('store').replaceOne({ _id: new ObjectId(storeId) }, store);
    return response;
};

const deleteStore = async (storeId) => {
    const response = await mongodb.getDatabase().db('music').collection('store').deleteOne({ _id: new ObjectId(storeId) });
    return response;
};

const createStore = async (store) => {
    if (!store.name || !store.url) {
        throw new Error('Name and URL are required fields.');
    }

    const response = await mongodb.getDatabase().db('music').collection('store').insertOne(store);
    return response;
};

module.exports = {
    getAllStores,
    getSingleStore,
    updateStore,
    deleteStore,
    createStore
};
