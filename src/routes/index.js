const siteRouter = require("./site");
const adminRouter = require("./admin");
const authRouter = require("./auth");
const productRouter = require("./product");
const orderRouter = require("./order");
const paymentRouter = require("./payment");
const globalErrorHandler = require("./errorHandler");

function route(app) {
  app.use("/admin", adminRouter);
  app.use("/", siteRouter);

  // handle authentication
  app.use("/auth", authRouter);

  // handle products
  app.use("/api/v1/products", productRouter);

  // handle orders
  app.use("/api/v1/orders", orderRouter);

  // handle payment
  app.use("/api/v1/payment", paymentRouter);

  // handle all middleware error
  app.use(globalErrorHandler);
}

module.exports = route;
