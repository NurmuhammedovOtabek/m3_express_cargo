const sequelize = require("../config/db")

const {DataTypes} = require("sequelize")

const Admin = sequelize.define("admin",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    full_name:{
        type: DataTypes.STRING(50),
    },
    user_name:{
        type: DataTypes.STRING(50)
    },
    password:{
        type: DataTypes.STRING(100)
    },
    phone_number:{
        type: DataTypes.STRING(11)
    },
    email:{
        type: DataTypes.STRING(50)
    },
    tg_link:{
        type: DataTypes.STRING(50)
    },
    is_creator:{
        type: DataTypes.BOOLEAN
    },
    is_active:{
        type: DataTypes.BOOLEAN
    },
    discription:{
        type: DataTypes.STRING
    },
    refresh_token: DataTypes.STRING
})

module.exports = Admin