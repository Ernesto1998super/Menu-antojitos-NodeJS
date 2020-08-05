const express = require('express');
const app = express();

const rPlatillos = require('../models/rPlatillos');
const bodyParser = require('body-parser');


app.get('/rPlatillo', function(req, res) {
    rPlatillos.find({})
        .exec((err, rPlatillos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.status(200).json({
                ok: true,
                rPlatillos
            })
        })
});


app.post('/rPlatillo', (req, res) => {
    let body = req.body;
    const platillos = new rPlatillos(req.body);
    platillos.save((err, platillo) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!platillo) {
            res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            platillo,
            status: 'Se guardo la información'
        })
    });

});


app.get('/rPlatillo/:id', function(req, res) {
    let id = req.params.id;
    console.log(id);
    rPlatillos.find({ _id: id })
        .exec((err, rPlatillos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al consultar los platillos',
                    err
                });
            }
            res.status(200).json({
                ok: true,
                msg: 'Se han consultado correctamente los platillos',
                rPlatillos
            })
        })
});



//Falta editar esto

app.put('/rPlatillo/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;
    console.log(req.params.id);
    const platillo = {
        strNombre: body.strNombre,
        strDescripcion: body.strDescripcion,
        strIngredientes: body.strIngredientes,
        nmbPiezas: body.nmbPiezas,
        nmbPrecio: body.nmbPrecio,
        blnStatus: body.blnStatus
    }
    console.log(platillo);
    rPlatillos.findByIdAndUpdate(id, platillo, { new: true, runValidators: true }, (err, platillo) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!platillo) {
            res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            platillo,
            status: 'se actualizo la informacion'
        })
    });

});

module.exports = app;