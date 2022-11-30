const app = require("./app");
// const SortMiddleware = require('./app/middlewares/SortMiddleware');

const port = 3000;

const db = require("./config/db");

// Connect to DB
db.connect();

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
