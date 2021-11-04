const express = require('express');
const router = express.Router();
const login = require('../middleware/login');
const MusicController = require('../controllers/music-controller');

router.get('/', login.opcional, (req, res, next) => { res.render('home.ejs'); });
router.get('/api', login.opcional, MusicController.getAllMusics);
module.exports = router;