const songModel = require('../models/songModel');

const getAllSongs = async (req, res) => {
    console.log('inside getAll for songs');
    //#swagger.tags = ['songs']
    try {
        const songs = await songModel.getAllSongs();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json(error.message || 'Some error occurred while fetching songs.');
    }
};

const getSingleSong = async (req, res) => {
    console.log('inside getSingle for song');
    //#swagger.tags = ['songs']
    const songId = req.params.id;
    try {
        const song = await songModel.getSingleSong(songId);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(song);
    } catch (error) {
        res.status(500).json(error.message || 'Some error occurred while fetching the song.');
    }
};

const updateSong = async (req, res) => {
    console.log('inside update song');
    //#swagger.tags = ['songs']
    const songId = req.params.id;
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

    try {
        await songModel.updateSong(songId, song);
        res.status(204).send();
    } catch (error) {
        res.status(500).json(error.message || 'Some error occurred while updating this song.');
    }
};

const deleteSong = async (req, res) => {
    console.log("inside delete songs");
    //#swagger.tags = ['songs']
    const songId = req.params.id;

    try {
        const response = await songModel.deleteSong(songId);
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting this song.');
        }
    } catch (error) {
        res.status(500).json(error.message || 'Some error occurred while deleting this song.');
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

    try {
        await songModel.createSong(song);
        res.status(204).send();
    } catch (error) {
        res.status(500).json(error.message || 'Some error occurred while creating the song.');
    }
};

module.exports = {
    getAllSongs,
    getSingleSong,
    createSong,
    updateSong,
    deleteSong
};
