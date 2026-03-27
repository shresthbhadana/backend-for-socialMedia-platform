const express = require("express");
const app = express();
const { swaggerUi, specs } = require("./swagger/swagger");
const errorHandler = require("./middlewares/error.middleware.js");
const initRoutes = require("./routes");
app.use(express.json());
app.use(express.urlencoded({extended : true}))


 initRoutes(app);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
 
app.use(errorHandler);

module.exports = app 