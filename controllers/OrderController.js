const { response, request, json } = require("express");
const Order = require("../models/order");
const excel = require("exceljs");
const fs = require("fs");

this.message = "";

/* 
const home = (req, res = response) => {

    res.render("order/home");
} */

const list = async (req, res = response) => {
  try {
    const [orders] = await Promise.all([
      Order.find().select({
        fecha: 1,
        precio: 1,
        nombreCliente: 1,
        producto: 1,
        direccion: 1,
        nombreVendedor: 1,
        metodoPago: 1,
        pago: 1
      }),
    ]);

    if (!orders) {
      return res.status(400).json({
        ok: false,
        msg: "No hay ninguna orden",
      });
    }

    return res.json({
      ok: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Tabla no renderizada",
    });
  }
};

const show = async (req, res = response) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      return res.status(400).json({
        ok: false,
        msg: "Order no encontrada",
      });
    }

    return res.json({
      ok: true,
      order,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "La orden no se encuentra",
    });
  }
};

/* const edit = async (req, res = response) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    return res.json({
      ok: true,
      order,
    });
  } catch (error) {
    console.log(error);
  }
}; */

const update = async (req, res = response) => {
  try {
    const { id } = req.params;
    const { _id, fecha, ...all } = req.body;

    const order = await Order.findByIdAndUpdate(id, all);

    if (!order) {
      return res.status(400).json({
        ok: false,
        msg: "Orden no encontrada",
      });
    }

    return res.json({
      ok: true,
      order,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Algo fallo actualizando la orden",
    });
  }
};
/* 
const create = (req, res = response) => {
  const mensaje = this.message;
  this.message = "";
  res.render("order/create", { mensaje });
};
 */
const save = async (req = request, res = response) => {
  try {
    const body = req.body;
    const order = new Order(body);

    await order.save();
    return res.json({
      ok: true,
      order,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Algo fallo no se puedo guardar la orden",
      error,
    });
  }
};

const remove = async (req, res = response) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(400).json({
        ok: false,
        msg: "Order no encontrada",
      });
    }

    return res.json({
      ok: true,
      order,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Algo fallo, no se pudo remover la Orden",
    });
  }
};

const convert = async (req, res = response) => {
  const orders = await Order.find();
  const workbook = new excel.Workbook();
  const worksheet = workbook.addWorksheet("Mis ordenes");

  worksheet.columns = [
    { header: "Nombre Vendedor", key: "nombreVendedor", width: 10 },
    { header: "Nombre Cliente", key: "nombreCliente", width: 10 },
    { header: "Dirección", key: "direccion", width: 10 },
    { header: "Producto/s", key: "producto", width: 10 },
    { header: "Precio", key: "precio", width: 10 },
    { header: "Metodo de Pago", key: "metodoPago", width: 10 },
    { header: "Pago", key: "pago", width: 10 },
    { header: "Fecha", key: "fecha", width: 10 },
  ];

  orders.forEach((order) => {
    worksheet.addRow(order);
  });

  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });

  const data = await workbook.xlsx.writeFile("public/orders.xlsx");

  res.download(__dirname + "/../public/orders.xlsx");
};

module.exports = {
  list,
  save,
  update,
  remove,
  show,
  convert,
};
