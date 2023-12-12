const Validator = require('validatorjs');

const validateSongs = (req, res, next) => {
    const validationRules = {
        title: 'required|string',
        artist: 'required|string',
        album: 'required|string',
        genre: 'required|string',
        year: 'required|numeric|min:1900', 
        duration: 'required|string',
        bpm: 'required|string',
        key: 'required|string|in:A,B,C,D,E,F,G', 
    };

    const customMessages = {
        'required.title': 'The title field is required.',
        'required.artist': 'The artist field is required.',
        'required.album': 'The album field is required.',
        'required.genre': 'The genre field is required.',
        'required.year': 'The year field is required.',
        'numeric.year': 'The year must be a valid number.',
        'min.year': 'The year must be greater than or equal to 1900.',
        'required.duration': 'The duration field is required.',
        'required.bpm': 'The bpm field is required.',
        'required.key': 'The key field is required.',
        'in.key': 'Invalid key. Valid keys are: A, B, C, D, E, F, G.',
    };

    const validation = new Validator(req.body, validationRules, customMessages);

    validation.passes(() => {
        next();
    });

    validation.fails(() => {
        res.status(412).send({
            success: false,
            message: 'Validation failed',
            errors: validation.errors.all(),
        });
    });
};

module.exports = {
    validateSongs,
};
