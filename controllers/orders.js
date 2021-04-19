const { response } = require('express');
const Order = require('../models/order');



const list = async(req, res = response) => {


    const [total, orders] = await Promise.all([
        Order.countDocuments(),
        Order.find()
    ]);

    res.json({
        total,
        orders 
    });

};

const update = async(req, res = response) => {

    const { id } = req.params;
    const {_id, ...all} = req.body;

    const order = await Order.findByIdAndUpdate(id, all);
    res.json({
        order
    });

};

const create = async(req, res = response) => {

    const body = req.body;
    const order = new Order( body );

    await order.save();

    res.json({
        order
    });


};

const remove = async(req, res = response) => {

    const {id} = req.params; 
    const order = await Order.findByIdAndDelete( id );

    res.json({
        order
    });

};

module.exports = {
    list,
    create,
    update,
    remove
}