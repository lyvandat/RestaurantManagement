use master 
go

if DB_ID('thuongmaidientu') is not null
	drop database thuongmaidientu

create database thuongmaidientu
go

use thuongmaidientu
go

create table HOPDONG
(
 MAHOPDONG varchar(50),
 TENNGANHANG nvarchar(50),
 CHINHANH nvarchar(50),
 SOTAIKHOAN varchar(50),
 DIACHI nvarchar(50),
 NGUOIDAIDIEN nvarchar(50),
 SOCHINHANH int,
 MASOTHUE nvarchar(50),
 THOIHAN date,
 PHIHOAHONG float,
 TINHTRANG nvarchar(50),
 DOITAC varchar(50), -- foreign key

 primary key(MAHOPDONG)
)

create table DOITAC
(
 MADOITAC varchar(50),
 SDT varchar(50),
 LOAIAMTHUC nvarchar(50),
 SOLUONGDONHANGNGAY int,
 SOLUONGCHINHANH int, 
 DIACHI nvarchar(50),
 TENQUAN nvarchar(50),
 NGUOIDAIDIEN nvarchar(50),
 EMAIL varchar(50),
 TINHTRANG nvarchar(50),
 TAIKHOAN varchar(50),

 primary key(MADOITAC)
)

create table KHACHHANG
(
 MAKHACHHANG varchar(50),
 HOTEN nvarchar(50),
 SDT varchar(50),
 DIACHI nvarchar(50),
 EMAIL varchar(50),
 TAIKHOAN varchar(50),

 primary key(MAKHACHHANG)
)


create table TAIKHOAN
(
	MATAIKHOAN varchar(50),
	TENDANGNHAP varchar(50),
	MATKHAU varchar(50),
	VAITRO nvarchar(50),
)

create table TAIXE
(
 MATAIXE varchar(50),
 HOTEN nvarchar(50),
 SDT varchar(50),
 DIACHI nvarchar(200),
 BIENSOXE varchar(50),
 KHUVUC nvarchar(50),
 EMAIL varchar(50),
 SOTAIKHOAN varchar(50),
 TENNGANHANG nvarchar(50),
 TAIKHOAN varchar(50),

 primary key (MATAIXE)
)

-- giống khách hàng
create table NHANVIEN
(
 MANHANVIEN varchar(50),
 HOTEN nvarchar(50),
 SDT varchar(50),
 DIACHI nvarchar(50),
 EMAIL varchar(50), 
 TAIKHOAN varchar(50),

 primary key(MANHANVIEN)
)

-- giống khách hàng
create table QUANTRI
(
 MAQUANTRI varchar(50),
 HOTEN nvarchar(50),
 SDT varchar(50),
 DIACHI nvarchar(50),
 EMAIL varchar(50),
 TAIKHOAN varchar(50),

 primary key(MAQUANTRI)
)

create table THUCDON 
(
 MATHUCDON varchar(50),
 NHAHANG varchar(50) -- foreign key DOITAC(MADOITAC)

 primary key (MATHUCDON)
)

create table MONAN 
(
 MAMONAN varchar(50),
 THUCDON varchar(50), -- foreign key THUCDON(MATHUCDON)
 TENMON nvarchar(80), -- unique
 MIEUTA nvarchar(200),
 GIA float,
 TINHTRANG nvarchar(50),
 TUYCHON varchar(50), -- foreign key TUYCHON(MATUYCHON)
 SOLUONG int,
 TENTUYCHON nvarchar(50),

 primary key (MAMONAN, THUCDON),
 constraint UC_TENMON unique(TENMON)
)

create table TUYCHON
(
 MATUYCHON varchar(50),
 TEN nvarchar(50),

 primary key(MATUYCHON, TEN)
)

create table DONDATHANG
(
 MADONDATHANG varchar(50),
 KHACHHANG varchar(50), -- foreign  key KHACHHANG(MAKHACHHANG)
 DOITAC varchar(50), -- foreign key DOITAC(MADOITAC)
 TAIXE varchar(50), -- foreign key TAIXE(MATAIXE)
 TINHTRANG nvarchar(50),
 THANHTIEN float,

 primary key (MADONDATHANG, KHACHHANG, DOITAC)
)

create table CUAHANG
(
 MADOITAC varchar(50),
 MACUAHANG varchar(50),
 TENQUAN nvarchar(50),
 CHINHANHTHU int,
 DIACHI nvarchar(50),
 GIOMOCUA varchar(50),
 GIODONGCUA varchar(50),
 TINHTRANG nvarchar(50),
 CAPNHAT date

 primary key(MADOITAC, MACUAHANG)
)

create table CHITIETDONHANG
(
 MACHITIETDONHANG varchar(50),
 MADONDATHANG varchar(50), -- foreign
 KHACHHANG varchar(50), -- foreign 
 DOITAC varchar(50), -- foreign 
 MAMONAN varchar(50),
 SOLUONG int,
 TENQUAN nvarchar(50),
 DIACHI nvarchar(50),

 primary key (MACHITIETDONHANG, MADONDATHANG, KHACHHANG, DOITAC)
)

alter table CUAHANG
add 
	foreign key(MADOITAC)
	references DOITAC
alter table HOPDONG 
add 
foreign key(DOITAC) 
references DOITAC

alter table THUCDON 
add
foreign key(NHAHANG)
references DOITAC

alter table MONAN
add
foreign key(THUCDON)
references THUCDON

alter table DONDATHANG
add 
foreign key(KHACHHANG)
references KHACHHANG,
foreign key(DOITAC)
references DOITAC

alter table MONAN
add
foreign key(TUYCHON, TENTUYCHON)
references TUYCHON

alter table CHITIETDONHANG
add 
foreign key(MADONDATHANG, KHACHHANG, DOITAC)
references DONDATHANG

select * from hopdong
select * from dondathang
select * from doitac
select * from monan
select * from thucdon
select * from taixe
select * from khachhang
select * from nhanvien
select * from quantri
select * from tuychon
select * from taikhoan

select * from doitac
insert into DOITAC
values ('DT001', '0909090901', N'Cơm', 100, 10, N'227 Nguyễn Văn Cừ Quận 5 TPHCM', N'Cơm', N'Lý Văn Đạt', 'lydat@gmail.com', N'Đã xác nhận', 'null')
insert into DOITAC
values ('DT002', '0909090902', N'Cơm', 200, 20, N'228 Nguyễn Cừ Quận 6 TPHCM', N'Phở', N'Lý Văn B', 'lydatpro@gmail.com', N'Đã xác nhận', 'null')
insert into DOITAC
values ('DT003', '0909090903', N'Cơm', 300, 30, N'229 Cư Trinh Quận 7 TPHCM', N'Bún riêu', N'Lý Văn C', 'lydatvip@gmail.com', N'Đã xác nhận', 'null')
insert into DOITAC
values ('DT004', '0909090904', N'Cơm', 400, 40, N'230 Phạm Văn Đồng Quận 8 TPHCM', N'Đa dạng', N'Lý Văn D', 'lydatsieunhan@gmail.com', N'Đã xác nhận', 'null')
insert into DOITAC
values ('DT005', '0909090905', N'Cơm', 500, 50, N'231 Cửu Long Quận 9 TPHCM', N'Bún mắm', N'Lý Văn E', 'lydat30@gmail.com', N'Đã xác nhận', 'null')


select * from khachhang
insert into KHACHHANG
values('KH001', N'Lý Văn Đạt', '0101010101', N'30 Cô Đông
Phường 3 TPHCM', N'datne@gmail.com', 'null')
insert into KHACHHANG
values('KH002', N'Lý Văn Cường', '0101010102', N'30 Cô Đông Phường 3 TPHCM', N'dongne@gmail.com', 'null')
insert into KHACHHANG
values('KH003', N'Lý Văn Đức', '0101010103', N'30 Tân Định Phường 3 TPHCM', N'cuongne@gmail.com', 'null')
insert into KHACHHANG
values('KH004', N'Lý Văn Đông', '0101010104', N'30 Thạch Lam Phường 3 TPHCM', N'ducne@gmail.com', 'null')
insert into KHACHHANG
values('KH005', N'Lý Văn Đại', '0101010105', N'30 Bửu Quang Phường 3 TPHCM', N'daine@gmail.com', 'null')

-- taixe , nhanvien, quantri, thucdon
select * from taixe
insert into TAIXE
values('TX001', N'Hoàng Đại', '0202020201', N'28 Hiệp Phát Phường 3 TPHCM', '21A-0009', N'Nhà Bè', 'tx1@gmail.com', '000000001', N'Ngân hàng nhà nước VN', 'null')
insert into TAIXE
values('TX002', N'Hoàng Đức', '0202020202', N'28 Đường Số 19 Phường 2 TPHCM', '21A-0009', N'Quận 5', 'tx2@gmail.com', '000000002', N'Ngân hàng nhà nước VN', 'null')
insert into TAIXE
values('TX003', N'Hoàng Đông', '0202020203', N'28 Phan QUang Phường 12 TPHCM', '21A-0009', N'Quận 9', 'tx2@gmail.com', '000000003', N'Ngân hàng nhà nước VN', 'null')
insert into TAIXE
values('TX004', N'Hoàng Việt', '0202020204', N'28 Lũy Bán Bích Phường 13 TPHCM', '21A-0009', N'Quận 1', 'tx3@gmail.com', '000000004', N'Ngân hàng Sacombank', 'null')

select * From nhanvien
insert into NHANVIEN
values('NV001', N'Nhân viên 1', '1101010101', N'30 Hiệp Tân Quận 12 TPHCM', N'nv1@gmail.com', 'null')
insert into NHANVIEN
values('NV002', N'Nhân viên 2', '1101010102', N'30 Hiệp Tân Quận 12 TPHCM', N'nv2@gmail.com', 'null')
insert into NHANVIEN
values('NV003', N'Nhân viên 3', '1101010103', N'30 Hiệp Tân Quận 12 TPHCM', N'nv3@gmail.com', 'null')
insert into NHANVIEN
values('NV004', N'Nhân viên 4', '1101010104', N'30 Hiệp Tân Quận 12 TPHCM', N'nv4@gmail.com', 'null')

select * from quantri
insert into QUANTRI
values('QT001', N'Quản trị 1', '2001010101', N'32 Hiệp Tân Quận 12 TPHCM', N'qt1@gmail.com', 'null')
insert into QUANTRI
values('QT002', N'Quản trị 2', '2001010102', N'32 Hiệp Tân Quận 12 TPHCM', N'qt2@gmail.com', 'null')
insert into QUANTRI
values('QT003', N'Quản trị 3', '2001010103', N'32 Hiệp Tân Quận 12 TPHCM', N'qt3@gmail.com', 'null')
insert into QUANTRI
values('QT004', N'Quản trị 4', '2001010104', N'32 Hiệp Tân Quận 12 TPHCM', N'qt4@gmail.com', 'null')

select * from thucdon
insert into THUCDON
values('TD001', 'DT001')
insert into THUCDON
values('TD002', 'DT002')
insert into THUCDON
values('TD003', 'DT003')
insert into THUCDON
values('TD004', 'DT004')

select * from tuychon
insert into TUYCHON
values('TC001', N'Không đường')
insert into TUYCHON
values('TC001', N'Không đá')
insert into TUYCHON
values('TC001', N'Ít đường')
insert into TUYCHON
values('TC001', N'Ít đá')
insert into TUYCHON
values('TC002', N'Nhiều ớt')
insert into TUYCHON
values('TC002', N'Ít ớt')


select * From monan
insert into MONAN
values('MA001', 'TD001', N'Phở ngon', N'Phở rất ngon', 200, N'Còn món','TC002',100, N'Ít ớt')
insert into MONAN
values('MA002', 'TD001', N'Phở không ngon', N'Phở rất ngon', 200, N'Còn món','TC002',100, N'Ít ớt')
insert into MONAN
values('MA001', 'TD002', N'Cơm ngon', N'cơm rất ngon', 200, N'Còn món','TC002',100, N'Ít ớt')
insert into MONAN
values('MA002', 'TD002', N'Cơm không ngon', N'cơm rất ngon', 200, N'Còn món','TC002',100, N'Ít ớt')
insert into MONAN
values('MA001', 'TD003', N'Bún ngon', N'Bún rất ngon', 200, N'Còn món','TC002',100, N'Ít ớt')
insert into MONAN
values('MA002', 'TD003', N'Bún không ngon', N'Bún rất ngon', 200, N'Còn món','TC002',100, N'Ít ớt')
insert into MONAN
values('MA001', 'TD004', N'Trà sữa', N'Tôm rất ngon', 200, N'Còn món','TC001',100, N'Ít đường')
insert into MONAN
values('MA002', 'TD004', N'Trà sữa hoàng kim', N'Tôm rất ngon', 200, N'Còn món','TC001',100, N'Ít đường')

select * from hopdong
-- bỏ số lượng chị nhánh, địa chỉ, chinhanh, nguoi dai dien
insert into HOPDONG
values('HD001', N'Ngân hàng nhà nước', N'227 Nguyễn Văn Cừ Quận 5 bỏ', '9991234567', N'227 Nguyễn Văn Cừ Quận 5 TPHCM bỏ', N'Lý Văn Đạt - bỏ', 100, 'TAX001', '2023-1-1', 0.1, N'Chưa xác nhận', 'DT001')
insert into HOPDONG 
values('HD002', N'Ngân hàng nhà nước', N'227 Nguyễn Văn Cừ Quận 5 bỏ', '9991234568', N'227 Nguyễn Văn Cừ Quận 5 TPHCM bỏ', N'Lý Văn Đạt - bỏ', 100, 'TAX002', '2023-1-1', 0.1, N'Chưa xác nhận', 'DT002')

select * from DONDATHANG
insert into DONDATHANG
values('DDH001', 'KH001', 'DT001', 'TX001', N'Chờ xác nhận', 1000)
insert into DONDATHANG
values('DDH002', 'KH001', 'DT002', 'TX001', N'Chờ xác nhận', 2000)
insert into DONDATHANG
values('DDH003', 'KH002', 'DT001', 'TX001', N'Chờ xác nhận', 3000)

select * From doitac
select * from dondathang
select * from cuahang
insert into CUAHANG values ('DT001', 'CH001', N'HAIDILO', 1, N'87 phan xích long bình thạnh tphcm', '08:00:00', '17:00:00', N'Đang mở', '1-1-2020')
insert into CUAHANG values ('DT001', 'CH002', N'HAIDILO', 2, N'89 phan xích long bình thạnh tphcm', '08:00:00', '17:00:00', N'Đang mở', '1-1-2020')
insert into CUAHANG values ('DT002', 'CH001', N'KICHI', 1, N'101 nguyễn sơn g bình thạnh tphcm', '08:00:00', '17:00:00', N'Đang mở', '1-1-2020')
insert into CUAHANG values ('DT002', 'CH002', N'KICHI', 1, N'87 mai đào bình thạnh tphcm', '08:00:00', '17:00:00', N'Ngừng nhận đơn', '1-1-2020')

insert into CHITIETDONHANG values ('CT001', 'DDH001', 'KH001', 'DT001', 'MA001',5, N'HADILAO', '87 Phan Xích Long Bình Thành TPHCM')
insert into CHITIETDONHANG values ('CT002', 'DDH001', 'KH001', 'DT001', 'MA003',10, N'HADILAO', '87 Phan Xích Long Bình Thành TPHCM')
insert into CHITIETDONHANG values ('CT003', 'DDH003', 'KH002', 'DT001', 'MA003',10, N'HADILAO', '87 Phan Xích Long Bình Thành TPHCM')

use thuongmaidientu 
go

select * from doitac