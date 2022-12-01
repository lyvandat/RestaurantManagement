const siteRouter = require("./site");
const productsRouter = require("./products");
const cartRouter = require("./cart");
const adminRouter = require("./admin");
const buyRouter = require("./buy");
const userRouter = require('./user');

function route(app) {
  app.use('/user', userRouter);
  app.use("/buy", buyRouter);
  app.use("/cart", cartRouter);
  app.use("/products", productsRouter);
  app.use("/admin", adminRouter);
  
  app.use("/", siteRouter);
}

module.exports = route;
