const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const moment = require("moment");
const helmet = require("helmet");
const path = require("path");
const config = require("./config/config");
const createPortProxy = require("./config/port-proxy");
const morgan = require("morgan");
const swaggerSpec = require("./config/swagger");
logger = require("./services/logger.js");
mailer = require("./services/mailer");
require("dotenv").config();
global.__basedir = __dirname;

//Database connection
if (config.applicationDatabase == "MYSQL") {
  require("./config/mysql");
} else {
  require("./config/mongo");
}

//Load Router
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const salesRoute = require("./routes/sales");

app.use(morgan("dev"));

app.use(
  bodyParser.json({
    limit: 5242880
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

//Swagger route
app.get("/swagger.json", function(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(helmet());

//Provider router
app.use("/restapi/user", userRoute);
app.use("/restapi/auth", authRoute);
app.use("/restapi/sales", salesRoute);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 400;
  next(error);
});

app.use((error, req, res, next) => {
  delete error.stack;
  //console.log(error.message);
  const statusCode = error.status || 500;
  res.status(statusCode).json({
    code: statusCode,
    message: error.message
  });
});

/* Find Exception and send email to admin */
process.on("uncaughtException", function(error) {
  console.log("error uncaughtException");
  var exception_msg = error.message,
    exception_stack = error.stack;

  logger.info("App Crashed! ", exception_msg);
  logger.error("stack ", exception_stack);

  var data = {
    err_msg: exception_msg,
    err_stack: exception_stack,
    isAdmin: 1
  };
  mailer.sendEmail(data);
});

server = http.createServer(app);

const socketIO = require("socket.io")(server);
socketIO.on("connection", function(clientSocket) {
  console.log(clientSocket.id + " is connected.");
  clientSocket.on("disconnect", function() {
    console.log(clientSocket.id + " is disconnected.");
  });
  clientSocket.on("eventFromClient", function(data) {
    socketIO.emit("eventFromServer", "Acknowledge client message " + data);
  });
});

// createPortProxy(8080, config.server.port);
server.listen(config.server.port);
logger.info(
  "-------- Starting Application --------  ",
  config.server.port,
  moment().format("DD-MM-YYYY hh:mm:ss:SSS A")
);
