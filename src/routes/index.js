const siteRouter = require("./site");
const authRouter = require("./auth");
const sellerRouter = require("./seller");
const storeRouter = require("./store");
// const productRouter = require("./product");
const menuRouter = require("./menu");
const orderRouter = require("./order");
const contractRouter = require("./contract");
const globalErrorHandler = require("./errorHandler");

function route(app) {
  // app.use("/admin", adminRouter);

  // // handle authentication
  app.use("/api/v1/auth", authRouter);

  // handle contract
  app.use("/api/v1/contract", contractRouter);
  app.use("/api/v1/seller", sellerRouter);
  app.use("/api/v1/store", storeRouter);
  app.use("/api/v1/menu", menuRouter);
  app.use("/api/v1/order", orderRouter);

  app.use("/", siteRouter);
  // // handle products
  // app.use("/api/v1/products", productRouter);

  // // handle payment
  // app.use("/api/v1/payment", paymentRouter);

  // // handle all middleware error
  app.use(globalErrorHandler);
}

module.exports = route;
