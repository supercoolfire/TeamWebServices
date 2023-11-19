const express = require('express');
const router = express.Router();

const songsController = require('../controllers/song');


router.get('/', songsController.getAllSongs);
router.get('/:id', songsController.getSingleSong);
router.post('/', songsController.createSong);
router.put('/:id', songsController.updateSong);
router.delete('/:id', songsController.deleteSong);


module.exports = router;