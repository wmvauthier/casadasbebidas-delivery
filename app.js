const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* setar as variáveis 'view engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './views');

/* configurar o middleware express.static */
app.use(express.static('./public'));

const rotaProducts = require('./routes/products');
const rotaUsuarios = require('./routes/usuarios');
const rotaPedidos = require('./routes/orders');
const rotaMusics = require('./routes/musics');


app.use((req, res, next) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    // res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Credentials", true);

    next();

})

/* CHAMADAS ROUTES FRONTEND */
app.get('/', (req, res, next) => { res.render('homePageDelivery.ejs') });
app.get('/admin', (req, res, next) => { res.render('login.ejs') });
app.get('/home', (req, res, next) => { res.render('home.ejs') });
app.get('/hours', (req, res, next) => { res.render('hours.ejs') });

/* CHAMADAS ROUTES BACKEND */
app.use('/products', rotaProducts);
app.use('/usuarios', rotaUsuarios);
app.use('/orders', rotaPedidos);
app.use('/musics', rotaMusics);


app.use(function (req, res, next) {
    res.status(404).render('errors/404');
    next();
});

// app.use(function (err, req, res, next) {
//     res.status(500).render('errors/500');
//     next();
// });

module.exports = app;