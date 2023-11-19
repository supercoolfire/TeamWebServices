const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async (req, res) => {
    console.log('inside getAll for users');
    //#swagger.tags = ['users']
    const result = await mongodb.getDatabase().db('music').collection('user').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

const getSingleUser = async (req, res) => {
    console.log('inside getSingle for user');
    //#swagger.tags = ['users']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('music').collection('user').find({ _id: userId });
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    });
};

const updateUser = async (req, res) => {
    console.log('inside update user');
    //#swagger.tags = ['users']
    const userId = new ObjectId(req.params.id);
    const user = {
        username: req.body.username,
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password
    };
    const response = await mongodb.getDatabase.db('music').collection('user').replaceOne( { _id: userId });
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating this user');
    }
};

const deleteUser = async (req, res) => {
    console.log("inside delete users");
    //#swagger.tags = ['users']
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('music').collection('user').deleteOne( { _id: userId });
    if (response.deletedCount > 0 ) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting this user.');
    }
};

const createUser = async (req, res) => {
    console.log("inside create users");
    //#swagger.tags = ['users']
    const user = {
        username: req.body.username,
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password        
    };
    const response = await mongodb.getDatabase().db('music').collection('user').insertOne( user );
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the user.');
    }
};

module.exports = {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
};
