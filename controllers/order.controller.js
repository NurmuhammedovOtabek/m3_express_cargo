const Admin = require("../models/admin");
const Client = require("../models/client");
const Currency_type = require("../models/currency_type");
const Order = require("../models/order");

const { Op } = require("sequelize");

const addOrder = async (req, res) => {
  try {
    const {
      product_link,
      quantity,
      sum,
      truck,
      desc,
      clientId,
      currencyTypeId,
    } = req.body;
    const newOrder = await Order.create({
      product_link,
      quantity,
      sum,
      truck,
      desc,
      clientId,
      currencyTypeId,
    });
    res.status(201).send({
      message: "Added",
      data: newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

const getAllOrders = async (req, res) => {
  try {
    const order = await Order.findAll({
      include: [
        { model: Client },
        { model: Currency_type },
        { model: Admin, through: { attributes: [] } },
      ],
    });
    res.status(200).send({
      message: "all orders",
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

const getByIdOrders = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id);
    res.status(200).send({
      message: "all orders",
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updateorder = await Order.update(req.body, {
      where: { id },
      returning: true,
    });
    console.log(updateOrder);

    res.status(201).send({
      message: "Updated",
      data: updateorder[1][0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await Order.destroy({ where: { id } });

    res.status(201).send({
      message: "Deleted",
      data: id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

const shart1 = async (req, res) => {
  try {
    const filtr = await Order.findAll({
      include: [{ model: Client , where: {full_name :{ [Op.like]: "A%"}}}],
      attributes: [],
      
    });
    console.log(filtr);
    res.status(200).json({
      message: filtr,
    });
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};



module.exports = {
  addOrder,
  getAllOrders,
  getByIdOrders,
  updateOrder,
  deleteOrder,
  shart1,
};
