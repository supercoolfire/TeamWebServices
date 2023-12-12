const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllSongs = async () => {
    const result = await mongodb.getDatabase().db('music').collection('song').find();
    return result.toArray();
};

const getSingleSong = async (songId) => {
    const result = await mongodb.getDatabase().db('music').collection('song').find({ _id: new ObjectId(songId) });
    const songs = await result.toArray();
    return songs[0];
};

const updateSong = async (songId, song) => {
    if (!song.title || !song.artist || !song.album || !song.genre || !song.year || !song.duration || !song.bpm || !song.key) {
        throw new Error('All fields (title, artist, album, genre, year, duration, bpm, key) are required.');
    }

    const response = await mongodb.getDatabase().db('music').collection('song').replaceOne({ _id: new ObjectId(songId) }, song);
    return response;
};

const deleteSong = async (songId) => {
    const response = await mongodb.getDatabase().db('music').collection('song').deleteOne({ _id: new ObjectId(songId) });
    return response;
};

const createSong = async (song) => {
    if (!song.title || !song.artist || !song.album || !song.genre || !song.year || !song.duration || !song.bpm || !song.key) {
        throw new Error('All fields (title, artist, album, genre, year, duration, bpm, key) are required.');
    }

    const response = await mongodb.getDatabase().db('music').collection('song').insertOne(song);
    return response;
};

module.exports = {
    getAllSongs,
    getSingleSong,
    updateSong,
    deleteSong,
    createSong
};
