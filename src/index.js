const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const port = 3000;

// Connect to DB
// const {conn, sql} = require("./config/db");

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
