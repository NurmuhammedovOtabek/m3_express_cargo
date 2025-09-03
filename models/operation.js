const sequelize = require("../config/db")

const {DataTypes} = require("sequelize")
const Admin = require("./admin")
const Order = require("./order")
const Status = require("./status")

const Operation = sequelize.define("operation",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    operation_date:{
        type: DataTypes.DATEONLY
    },
    description:{
        type: DataTypes.STRING
    },
})

Admin.belongsToMany(Order,{through: Operation})
Order.belongsToMany(Admin, {through: Operation})

Admin.hasMany(Operation)
Operation.belongsTo(Admin)

Order.hasMany(Operation, {as: `operation`})
Operation.belongsTo(Order, {as: `order`})

Status.hasMany(Operation, {as: `operation`}),
Operation.belongsTo(Status, {as:`status`})
// Operation.belongsTo(Admin)

module.exports = Operation