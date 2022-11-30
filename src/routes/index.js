const siteRouter = require("./site");
const productsRouter = require("./products");
const cartRouter = require("./cart");
const itemRouter = require("./item");
const adminRouter = require("./admin");
const buyRouter = require("./buy");
const listRouter = require("./list");

function route(app) {
  app.use("/list", listRouter);
  app.use("/buy", buyRouter);
  app.use("/item", itemRouter);
  app.use("/cart", cartRouter);
  app.use("/products", productsRouter);
  app.use("/admin", adminRouter);
  app.use("/", siteRouter);
}

module.exports = route;
