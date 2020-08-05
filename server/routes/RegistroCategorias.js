const express = require('express');
const app = express();
const rCategorias = require('../models/rCategorias');


app.get('/rCategoria', function(req, res) {
    rCategorias.find({})
        .exec((err, rCategorias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.status(200).json({
                ok: true,
                rCategorias
            })
        })
});

app.get('/rCategoria/:id', function(req, res) {
    let id = req.params.id;
    console.log(id);
    rCategorias.find({ _id: id })
        .exec((err, rCategorias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al consultar las categorias',
                    err
                });
            }
            res.status(200).json({
                ok: true,
                msg: 'Se han consultado correctamente la categorias',
                rCategorias
            })
        })
});



app.post('/rCategoria', (req, res) => {
    let body = req.body;
    const categorias = new rCategorias(req.body);
    categorias.save((err, categoria) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoria) {
            res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            categoria,
            status: 'Se guardo la información'
        })
    });

});

// app.put('/rCategoria', (req, res) => {
//     let id = req.params.idModalidad;
//     let numParam  = Object.keys(req.body).length;

//     let modalidadBody;
//     if(numParam == 6) {
//         modalidadBody =  _.pick(req.body,['strNombre', 'blnStatus']);
//     } 
//     if(numParam == 1) {
//         modalidadBody =  _.pick(req.body,['blnStatus']);
//     }
//     if(numParam !== 6 && numParam !== 1){
//         return res.status(400).json({
//             ok: false,
//             msg: 'Error al actualizar la modalidad',
//             err: 'El número de parametros enviados no concuerdan con los que requiere la API'
//         });
//     } 




app.delete('/rCategoria', (req, res) => {
    let id = req.params.idModalidad;

    Modalidad.findByIdAndUpdate(id, { blnStatus: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: 'Ha ocurrido un error al eliminar la modalidad',

            });
        }
        return res.status(200).json({
            ok: true,
            status: 200,
            msg: 'Se ha eliminado correctamente la modalidad',

        });
    });
});





app.put('/rCategoria/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;
    console.log(req.params.id);
    const categoria = {
        strNombre: body.strNombre,
        strDescripcion: body.strDescripcion,
        blnStatus: body.blnStatus
    }
    console.log(categoria);
    rCategorias.findByIdAndUpdate(id, categoria, { new: true, runValidators: true }, (err, categoria) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoria) {
            res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            categoria,
            status: 'se actualizado la informacion'
        })
    });

});

module.exports = app;