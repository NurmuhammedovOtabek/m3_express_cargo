const { sendErrorResponse } = require("../helpers/send.response.errors");
const Admin = require("../models/admin");
const Order = require("../models/order");
const bcrypt = require("bcrypt");

const addAdmin = async (req, res) => {
  try {
    const {
      full_name,
      user_name,
      password,
      confirm_password,
      phone_number,
      email,
      tg_link,
      is_creator,
      is_active,
      discription,
    } = req.body;
    const candidate = await Admin.findOne({ where: { email } });
    if (candidate) {
      return res.status(403).send({ message: "Bunday admin mavjud" });
    }
    if (password !== confirm_password) {
      return sendErrorResponse({ message: "parollar mos emas" }, res, 400);
    }

    const hashedPasword = await bcrypt.hash(password, 7);
    const newAdim = await Admin.create({
      full_name,
      user_name,
      password: hashedPasword,
      phone_number,
      email,
      tg_link,
      is_creator,
      is_active,
      discription,
    });
    res.status(201).send({
      message: "Added",
      data: newAdim,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const getAdmin = async (req, res) => {
  try {
    const get = await Admin.findAll({
      include: {
        model: Order,
      },
    });
    res.status(200).json({
      message: "Getting ",
      data: get,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const getByIdAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const dataC = await Admin.findByPk(id);
    res.status(200).json({
      message: "Succsess",
      data: dataC,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const updateC = await Admin.update(req.body, {
      where: { id },
      returning: true,
    });
    res.status(200).json({
      message: "succsess",
      data: updateC[1][0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    await Admin.destroy({ where: { id } });
    res.status(201).send({
      message: "Deleted",
      data: id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addAdmin,
  getAdmin,
  getByIdAdmin,
  updateAdmin,
  deleteAdmin,
};
