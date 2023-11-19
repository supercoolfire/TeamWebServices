const passport = require('passport');

const router = require('express').Router();
router.get('/', (req, res) => {
    //#swagger.tags = ['Hello World']
    res.send('Hello World');
});
// router.use('/', require('./swagger'));
router.use('/review', require('./review'));
router.use('/song', require('./song'));
router.use('/store', require('./store'));
router.use('/user', require('./user'));


module.exports = router;