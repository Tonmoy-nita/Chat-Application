const createError = require("http-errors");
const { title } = require("process");

//404 not found handler
function notFoundHandler(req, res, next) {
  next(createError(404, "Your requested content was not found"));
}

//default error handler
function errorHandler(err, req, res, next) {
  //   res.render("error", {
  //     title: "Error page",
  //   });
  //upor r error message send ta ke amra r ak rokom vabe korte pari
  //   res.locals.title = "Error page";
  //   res.render("error");

  res.locals.error =
    process.env.NODE_ENV === "development" ? err : { message: err.message };

  res.status(err.status || 500);

  if (res.locals.html) {
    res.render("error", {
      title: "Error page",
      error: res.locals.error,
    });
  } else {
    res.json(res.locals.error);
  }
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
