const siteRouter = require("./site");
const productsRouter = require("./products");
const cartRouter = require("./cart");
const itemRouter = require("./item");
const adminRouter = require("./admin");

function route(app) {
  app.use("/item", itemRouter);
  app.use("/cart", cartRouter);
  app.use("/products", productsRouter);
  app.use("/admin", adminRouter);
  app.use("/", siteRouter);
}

module.exports = route;
