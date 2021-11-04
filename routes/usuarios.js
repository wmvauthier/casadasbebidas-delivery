const express = require('express');
const router = express.Router();
const login = require('../middleware/login');
const UsuariosController = require('../controllers/usuarios-controller');

router.get('/api/pastores', login.opcional, UsuariosController.getPastores);
router.post('/register', login.opcional, UsuariosController.register);
router.post('/login', login.opcional, UsuariosController.login);

module.exports = router;