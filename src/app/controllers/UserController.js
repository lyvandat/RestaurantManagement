const catchAsync = require("../../utils/catchAsync");
const { conn, sql } = require("../../config/db");

exports.createOrder = catchAsync(async (req, res, next) => {
  const { menuId, foodId, sellerId, price, quantity } = req.body;
  const userId = req.user.MAKHACHHANG;
  const totalPrice = +price * +quantity;
  const pool = await sql.connect(req.config);
  const orderId = `DDH-${Date.now()}-${Math.ceil(Math.random() * 1000)}`;
  const detailOrderId = orderId.replace("DDH", "CT");
  console.log(
    detailOrderId,
    orderId,
    menuId,
    foodId,
    +quantity,
    userId,
    sellerId,
    totalPrice
  );
  await pool
    .request()
    .input("MACHITIET", sql.VarChar, detailOrderId)
    .input("MADONDATHANG", sql.VarChar, orderId)
    .input("THUCDON", sql.VarChar, menuId)
    .input("MONAN", sql.VarChar, foodId)
    .input("SOLUONG", sql.Int, +quantity)
    .input("MAKHACHHANG", sql.VarChar, userId)
    .input("MADOITAC", sql.VarChar, sellerId)
    .input("THANHTIEN", sql.Float, totalPrice)
    .execute("USP_DATHANG", function (err, data) {
      console.log(err);
      console.log(data);
      res.status(200).json({
        status: "success",
        data: null,
      });
    });
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
  const sellerId = req.params.customerId;
  const orderId = req.params.orderId;

  console.log(sellerId, orderId);

  const pool = await sql.connect(req.config);
  await pool
    .request()
    .input("MaDon", sql.VarChar, orderId)
    .input("KhachHang", sql.VarChar, req.user.MAKHACHHANG)
    .input("DoiTac", sql.VarChar, sellerId)
    .execute("USP_HUYDONHANG", function (err, data) {
      console.log(err);
      console.log(data);

      if (err) {
        return res.status(200).json({
          status: err.message,
          data: null,
        });
      }

      res.status(200).json({
        status: "success",
        data: null,
      });
    });
});
