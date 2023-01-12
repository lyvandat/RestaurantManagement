const catchAsync = require("../../utils/catchAsync");
const { conn, sql } = require("../../config/db");

exports.createContract = catchAsync(async function (req, res, next) {
  const pool = await conn;
  const result = await pool
    .request()
    .input(
      "MaHopDong",
      sql.VarChar,
      `HD-${Date.now()}-${Math.ceil(Math.random() * 1000)}`
    )
    .input("TenNganHang", sql.NVarChar, "agribank")
    .input("ChiNhanh", sql.NVarChar, "agribank")
    .input("SoTaiKhoan", sql.NVarChar, "bình thạnh")
    .input("DiaChi", sql.NVarChar, "12 bình thới")
    .input("NguoiDaiDien", sql.NVarChar, "Lý Đạt")
    .input("SoChiNhanh", sql.Int, 100)
    .input("MaSoThue", sql.NVarChar, "TAX001")
    .input("ThoiHan", sql.Date, "2030-01-01")
    .input("PhiHoaHong", sql.float, 0.9)
    .input("TinhTrang", sql.NVarChar, "Chưa xác nhận")
    .input("DoiTac", sql.NVarChar, "DT002")
    .execute("USP_LAPHOPDONG");

  const contract = result.recordset;

  res.status(200).json({
    status: "success",
    data: {
      contract,
    },
  });
});

exports.updateContractStatus = catchAsync(async function (req, res, next) {
  const id = req.params.id;
  // const queryString =
  //   "update HOPDONG set tinhtrang = @status where mahopdong = @id";
  const pool = await conn;

  await pool
    .request()
    .input("MaHopDong", sql.VarChar, id)
    .execute("USP_XACNHANHOPDONG", function (err, data) {
      console.log(err);
      res.status(201).json({
        status: "success",
        data: {
          data: data,
        },
      });
    });
});
