const express = require('express');
const router = express.Router();

const songsController = require('../controllers/song');
const {validateSongs} = require('../middleware/validate-songs');
const { isAuthenticated, isGod, isAdmin, isModerator } = require('../middleware/authenticate');


router.get('/', isAuthenticated, songsController.getAllSongs);
router.get('/:id', isAuthenticated, songsController.getSingleSong);
router.post('/', isAuthenticated, validateSongs, songsController.createSong);
router.put('/:id', isAuthenticated, validateSongs, songsController.updateSong);
router.delete('/:id', isAuthenticated, songsController.deleteSong);


module.exports = router;