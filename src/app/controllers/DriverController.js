const catchAsync = require("../../utils/catchAsync");
const { conn, sql } = require("../../config/db");

exports.driverAcceptOrder = catchAsync(async function (req, res, next) {
  const { userId, sellerId, orderId } = req.body;

  const pool = await sql.connect(req.config);
  await pool
    .request()
    .input("MaDon", sql.VarChar, orderId)
    .input("KhachHang", sql.VarChar, userId)
    .input("DoiTac", sql.VarChar, sellerId)
    .input("TinhTrang", sql.NVarChar, "Đã nhận đơn hàng")
    .execute("USP_CAPNHATTRANGTHAI", function (err, data) {
      console.log(err);
      console.log(data);
    });

  console.log("user", req.user);
  await pool
    .request()
    .input("taixe", sql.VarChar, req.user.MATAIXE)
    .input("madondathang", sql.VarChar, orderId)
    .input("khachhang", sql.VarChar, userId)
    .input("doitac", sql.VarChar, sellerId)
    .query(
      "update dondathang set taixe = @taixe where madondathang=@madondathang and khachhang=@khachhang and doitac=@doitac",
      function (err, data) {
        console.log(err);
        console.log(data);
        res.status(200).json({
          status: "success",
          data: null,
        });
      }
    );
});
