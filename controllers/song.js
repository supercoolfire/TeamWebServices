const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllSongs = async (req, res) => {
    console.log('inside getAll for songs');
    //#swagger.tags = ['songs']
    const result = await mongodb.getDatabase().db('music').collection('song').find();
    result.toArray().then((songs) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(songs);
    });
};

const getSingleSong = async (req, res) => {
    console.log('inside getSingle for song');
    //#swagger.tags = ['songs']
    const songId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('music').collection('song').find({ _id: songId });
    result.toArray().then((songs) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(songs[0]);
    });
};

const updateSong = async (req, res) => {
    console.log('inside update song');
    //#swagger.tags = ['songs']
    const songId = new ObjectId(req.params.id);
    const song = {
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        genre: req.body.genre,
        year: req.body.year,
        duration: req.body.duration,
        bpm: req.body.bpm,
        key: req.body.key
    };
    const response = await mongodb.getDatabase().db('music').collection('song').replaceOne( { _id: songId }, song );
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating this song');
    }
};

const deleteSong = async (req, res) => {
    console.log("inside delete songs");
    //#swagger.tags = ['songs']
    const songId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('music').collection('song').deleteOne( { _id: songId});
    if (response.deletedCount > 0 ) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting this song.');
    }
};

const createSong = async (req, res) => {
    console.log("inside create songs");
    //#swagger.tags = ['songs']
    const song = {
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        genre: req.body.genre,
        year: req.body.year,
        duration: req.body.duration,
        bpm: req.body.bpm,
        key: req.body.key
    };
    const response = await mongodb.getDatabase().db('music').collection('song').insertOne( song );
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the song.');
    }
};

module.exports = {
    getAllSongs,
    getSingleSong,
    createSong,
    updateSong,
    deleteSong
};
