const express = require("express");
const app = express();
const { swaggerUi, specs } = require("./swagger/swagger");
const errorHandler = require("./middlewares/error.middleware.js");
require("./config/postSchedule");
const initRoutes = require("./routes");
const limiter = require("./middlewares/ratelimiter.js")
app.use(express.json());
app.use(express.urlencoded({extended : true}))

app.use(limiter);
 initRoutes(app);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
 
app.use(errorHandler);

module.exports = app 