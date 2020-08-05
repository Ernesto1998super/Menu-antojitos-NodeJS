const mongoose = require('mongoose');

const { Schema } = mongoose;

const rCategoriaSchema = new Schema({
    strNombre: {
        type: String,
        required: [true, 'Llena la categoria'],
        unique: true

    },
    strDescripcion: {
        type: String
    },

    blnStatus: {
        type: Boolean,
        default: true
    }

});

module.exports = mongoose.model('rCategoria', rCategoriaSchema);

// a partir del video 92 registro categorias