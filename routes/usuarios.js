const express = require('express');
const router = express.Router();
const login = require('../middleware/login');
const UsuariosController = require('../controllers/usuarios-controller');

router.get('/users', login.opcional, UsuariosController.users);
router.post('/register', login.opcional, UsuariosController.register);
router.post('/login', login.opcional, UsuariosController.login);
router.get('/checkHours', login.opcional, UsuariosController.checkHours);
router.put('/checkHours', login.opcional, UsuariosController.updateHours);

module.exports = router;