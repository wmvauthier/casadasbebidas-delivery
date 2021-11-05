const express = require('express');
const router = express.Router();
const login = require('../middleware/login');
const UsuariosController = require('../controllers/usuarios-controller');

router.post('/users', login.opcional, UsuariosController.users);
router.post('/register', login.opcional, UsuariosController.register);
router.post('/login', login.opcional, UsuariosController.login);

module.exports = router;