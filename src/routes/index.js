const siteRouter = require("./site");
const adminRouter = require("./admin");
const authRouter = require("./auth");
const globalErrorHandler = require("./errorHandler");

function route(app) {
  // app.use("/user", userRouter);
  // app.use("/buy", buyRouter);
  // app.use("/cart", cartRouter);
  // app.use("/products", productsRouter);
  app.use("/admin", adminRouter);
  app.use("/", siteRouter);

  // handle authentication
  app.use("/auth", authRouter);
  // handle all middleware error
  app.use(globalErrorHandler);
}

module.exports = route;
