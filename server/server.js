require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const morgan = require('morgan');




const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(bodyParser.json());


app.use(require('./routes/RegistroCategorias'));
app.use(require('./routes/RegistroPlatillos'));
// app.use('RegistroCategorias', require('./routes/RegistroCategorias'));
// app.use('RegistroPlatillos', require('./routes/RegistroPlatillos'));
app.get('/', function(req, res) {
    res.send('back')
})

mongoose.connect('mongodb://localhost:27017/Final', (err, res) => {

    if (err) throw err;
    console.log('Base de datos en linea');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto:', process.env.PORT);
});