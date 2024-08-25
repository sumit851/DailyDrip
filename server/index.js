const express = require("express");
const app = express();
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");
const noteRouter = require("./route/noteRoute");
app.use(express.json({ limit: "10kb" }));

app.use("/api/v1/notes", noteRouter);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
//global error handler
app.use(globalErrorHandler);
module.exports = app;
