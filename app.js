const express = require("express");
const config = require("config");
const sequelize  = require("./config/db");

const mainRouter = require("./routes")

const PORT = config.get("port") ?? 3333;

const app = express();
app.use(express.json()) 
app.use("/api", mainRouter)

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync({alter: true})
    app.listen(PORT, () => {
      console.log(`Server started at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();



//order.controller ichida shar1   shart2 operation.controller ichida  
// shart3, shart4 client.controller da 