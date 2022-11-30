const siteRouter = require("./site");
const productsRouter = require("./products");
const cartRouter = require("./cart");
const itemRouter = require("./item");
const adminRouter = require("./admin");
const buyRouter = require("./buy");
const listRouter = require("./list");

function route(app) {
  app.use("/.netlify/functions/list", listRouter);
  app.use("/.netlify/functions/buy", buyRouter);
  app.use("/.netlify/functions/item", itemRouter);
  app.use("/.netlify/functions/cart", cartRouter);
  app.use("/.netlify/functions/products", productsRouter);
  app.use("/.netlify/functions/admin", adminRouter);
  app.use("/.netlify/functions/", siteRouter);
}

module.exports = route;
