const sql = require("mssql/msnodesqlv8");

const config = {
  server: "localhost",
  user: "lyvandat",
  password: "123456",
  database: "thuongmaidientu",
  driver: "msnodesqlv8",
};

const conn = new sql.ConnectionPool(config).connect().then((pool) => {
  return pool;
});

module.exports = {
  conn,
  sql,
};

// async function connect() {
//     try {
//         await mongoose.connect('mongodb+srv://cuongpham:211319539@cluster0.b87mt4q.mongodb.net/PTWeb_FinalProject_HCMUS');
//         console.log('connect successfully.');
//     } catch (error) {
//         console.log('connect failure.' + error);
//     }
// }

// module.exports = { connect };
