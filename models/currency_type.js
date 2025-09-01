const sequelize = require("../config/db")

const {DataTypes} = require("sequelize")

const Currency_type = sequelize.define("currency_type", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(50)
    },
    description: {
        type: DataTypes.STRING
    }
})

module.exports = Currency_type