var swaggerJSDoc = require("swagger-jsdoc");
var express = require("express");
var app = express();

// swagger definition
var swaggerDefinition = {
  info: {
    title: "Speak API",
    version: "1.0.0",
    description: "Documentation of Speak APIs"
  },
  host: "localhost:8080",
  basePath: "/"
};

// options for the swagger docs
var options = {
  swaggerDefinition: swaggerDefinition,
  apis: ["./routes/user.js", "./routes/auth.js"] // pass all in array
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
