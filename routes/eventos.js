const express = require('express');
const router = express.Router();
const login = require('../middleware/login');
const EventosController = require('../controllers/eventos-controller');

router.get('/', login.opcional, (req, res, next) => { res.render('igrejas.ejs'); });
router.get('/api', login.opcional, EventosController.getAllEventos);
router.get('/api/listaPersona/:idEvento', login.opcional, EventosController.getListaPersona);
router.get('/api/listaTicket/:idEvento', login.opcional, EventosController.getListaTickets);
router.get('/api/getQtdTicketsFromEvento/:id_evento', login.opcional, EventosController.getQtdTicketsFromEvento);
router.get('/api/insertEvent/:typeEvento/:dataEvento/:vagasEvento', login.opcional, EventosController.insertEvent);
router.get('/api/insertTicket/:id_evento/:ticket/:personaData', login.opcional, EventosController.insertTicket);
router.get('/api/insertTicketPersona/:id_evento/:nome/:rg/:status', login.opcional, EventosController.insertTicketPersona);

router.get('/api/insertIndividualPersona/:id_evento/:nome/:rg', login.opcional, EventosController.insertIndividualPersona);
router.get('/api/validateTicket/:ticket', login.opcional, EventosController.validateTicket);
router.get('/api/validatePersona/:id_ListaPersona', login.opcional, EventosController.validatePersona);
router.get('/api/cancelPersona/:id_ListaPersona', login.opcional, EventosController.cancelPersona);

module.exports = router;