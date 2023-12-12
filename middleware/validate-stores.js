const Validator = require('validatorjs');

const validateStores = (req, res, next) => {
    const validationRules = {
        name: 'required|string',
        url: 'required|url',
    };

    const customMessages = {
        'required.name': 'The name field is required.',
        'string.name': 'The name must be a valid string.',
        'required.url': 'The URL field is required.',
        'url.url': 'The URL must be a valid URL.',
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
    validateStores,
};
