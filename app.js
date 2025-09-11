const express = require("express");
const config = require("config");
const sequelize = require("./config/db");
const cookieParser = require("cookie-parser");
const logger = require("./service/logger.service");
const mainRouter = require("./routes");
const viewRouter = require("./routes/views.route");
const exHbs = require("express-handlebars")

const errorHandling = require("./middlewares/errors/error.handling");

const PORT = config.get("port") ?? 3333;

 
const app = express();
app.use(express.json()); // parse OSINT
app.use(cookieParser());
const hbs = exHbs.create({
  defaultLayout: "main",
  extname: "hbs",
})
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

//serve static
app.use(express.static("views")) //read

app.use("/", viewRouter); //fronted
app.use("/api", mainRouter);//bacend


app.use(errorHandling);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => {
      console.log(`Server started at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
