 
const {Schema, model } = require('mongoose');



const OrderSchema = Schema({
    nombreVendedor: {
        type: String,
        required: [true, 'El nombre es obligatoria'],
    },
    nombreCliente: {
        type: String,
        required: [true, 'El nombre es obligatoria'],
    },
    direccion: {
        type: String,
    },
    fecha: {
        type: Date,
        required: [true, 'la fecha es obligatorio']
    },
    producto: {
        type: String,
        required: [true, 'El producto es obligatorio'],
    },
    precio: {
        type: Number,
        required: [true, 'El precio es obligatori'],
    },
    metodoPago: {
        type: String,
        required: [true, 'El metodo de pago es obligatorio'],
    },
    pago: {
        type: Boolean,
        required: [true, 'El pago es obligatorio'],
    },
    offset: {
        type: String
    }


}, {
    timestamps:true,
}
);



module.exports = model( 'Order', OrderSchema );