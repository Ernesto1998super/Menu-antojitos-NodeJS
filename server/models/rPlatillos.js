const mongoose = require('mongoose');

const { Schema } = mongoose;

const rPlatilloSchema = new Schema({

    strNombre: {
        type: String,
        required: [true, 'Llena la categoria'],
        unique: true
    },

    strDescripcion: {
        type: String
    },

    strIngredientes: {
        type: String
    },

    nmbPiezas: {
        type: Number
    },

    nmbPrecio: {
        type: Number
    },

    blnStatus: {
        type: Boolean,
        default: true
    },

    categoria: { type: Schema.Types.ObjectId, ref: "Categoria" }

});

module.exports = mongoose.model('rPlatillo', rPlatilloSchema);