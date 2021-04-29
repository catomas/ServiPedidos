const { response, request, json } = require('express');
const Order = require('../models/order');
const excel = require('exceljs');
const fs = require('fs');



this.message = "";


const home = (req, res = response) => {

    res.render("order/home");
}


const list = async(req, res = response) => {

    try {
        const [orders] = await Promise.all([
            Order.find().select({fecha: 1, precio: 1, nombreCliente: 1, precio: 1, producto: 1}),
        ]);

        const mensaje = this.message
        this.message = ""
        
    
        res.render("order/list", {orders, mensaje});
        
    } catch (error) {
        console.log(error);
    }

};

const show = async(req, res = response) => {

    
    try {
        const { id } = req.params;
        const order = await Order.findById(id);
        res.render("order/show", {order})
        
    } catch (error) {
        console.log(error);
    }
}

const update = async(req, res = response) => {

    const { id } = req.params;
    const {_id, ...all} = req.body;

    const order = await Order.findByIdAndUpdate(id, all);
    res.json({
        order
    });

};

const create = (req, res = response) => {

        const mensaje = this.message
        this.message = ""
        res.render("order/create",{mensaje});
       

}

const save = async(req = request, res = response) => {
    
    try {
        const body = req.body;
        const order = new Order(body);
    
        await order.save();
      
        this.message = "Orden Creada Exitosamente!!"
        
    } catch (error) {
        
        this.message = "Algo fallo, no se pudo guardar la Orden"
        console.log(error);
    }
    
    
    res.redirect("/order/create");

};

const remove = async(req, res = response) => {
    
    try {
        
        const {id} = req.params; 
        const order = await Order.findByIdAndDelete( id );

        this.message = "Orden Eliminada Exitosamente!!"

        res.redirect("/order/list")

    } catch (error) {
        this.message = "Algo fallo, no se pudo guardar la Orden"
        console.log(error);
        
    }
};

const convert = async (req, res= response) => {

    const orders = await Order.find()
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Mis ordenes');

    worksheet.columns = [
        {header: 'Nombre Vendedor', key:'nombreVendedor', width:10},
        {header: 'Nombre Cliente', key:'nombreCliente', width:10},
        {header: 'Dirección', key:'direccion', width:10},
        {header: 'Producto/s', key:'producto', width:10},
        {header: 'Precio', key:'precio', width:10},
        {header: 'Metodo de Pago', key:'metodoPago', width:10},
        {header: 'Pago', key:'pago', width:10},
        {header: 'Fecha', key:'fecha', width:10},
    ];

    orders.forEach(order => {
        worksheet.addRow(order);
    });

    worksheet.getRow(1).eachCell((cell)=>{
        cell.font = {bold:true};
    });

    const data = await workbook.xlsx.writeFile('public/orders.xlsx');

    res.download( __dirname + '/../public/orders.xlsx')

};



module.exports = {
    list,
    create,
    save,
    update,
    remove,
    show, 
    convert,
    home
}