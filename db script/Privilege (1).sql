
--Phân công
--20127457 - Phạm Nguyễn Cao Cường


use master
go
exec sp_droplogin DT001
exec sp_droplogin DT002
exec sp_droplogin DT003
exec sp_droplogin DT004
exec sp_droplogin DT005

exec sp_droplogin KH001
exec sp_droplogin KH002
exec sp_droplogin KH003
exec sp_droplogin KH004
exec sp_droplogin KH005

exec sp_droplogin TX001
exec sp_droplogin TX002
exec sp_droplogin TX003
exec sp_droplogin TX004

exec sp_droplogin NV001
exec sp_droplogin NV002
exec sp_droplogin NV003
exec sp_droplogin NV004

exec sp_droplogin QT001
exec sp_droplogin QT002
exec sp_droplogin QT003
exec sp_droplogin QT004
go

use thuongmaidientu
go
drop user DoiTac001
drop user DoiTac002
drop user DoiTac003
drop user DoiTac004
drop user DoiTac005
go
drop user KhachHang001
drop user KhachHang002
drop user KhachHang003
drop user KhachHang004
drop user KhachHang005
go
drop user TaiXe001
drop user TaiXe002
drop user TaiXe003
drop user TaiXe004
go
drop user NhanVien001
drop user NhanVien002
drop user NhanVien003
drop user NhanVien004
go
drop user QuanTri001
drop user QuanTri002
drop user QuanTri003
drop user QuanTri004
go
use thuongmaidientu
go
drop role DoiTac
drop role KhachHang
drop role TaiXe
drop role NhanVien
drop role QuanTri


--====================== Tạo LOGIN ======================--

-- Tạo login cho ĐỐI TÁC
use master;
go
create login DT001
with password = '123',
default_database = thuongmaidientu;

create login DT002
with password = '123',
default_database = thuongmaidientu;

create login DT003
with password = '123',
default_database = thuongmaidientu;

create login DT004
with password = '123',
default_database = thuongmaidientu;

create login DT005
with password = '123',
default_database = thuongmaidientu;

--==========================================

-- Tạo login cho KHÁCH HÀNG
use master;
go
create login KH001
with password = '123',
default_database = thuongmaidientu;

create login KH002
with password = '123',
default_database = thuongmaidientu;

create login KH003
with password = '123',
default_database = thuongmaidientu;

create login KH004
with password = '123',
default_database = thuongmaidientu;

create login KH005
with password = '123',
default_database = thuongmaidientu;

--==========================================

-- Tạo login cho TÀI XẾ
use master;
go
create login TX001
with password = '123',
default_database = thuongmaidientu;

create login TX002
with password = '123',
default_database = thuongmaidientu;

create login TX003
with password = '123',
default_database = thuongmaidientu;

create login TX004
with password = '123',
default_database = thuongmaidientu;

--==========================================

-- Tạo login cho NHÂN VIÊN
use master;
go
create login NV001
with password = '123',
default_database = thuongmaidientu;

create login NV002
with password = '123',
default_database = thuongmaidientu;

create login NV003
with password = '123',
default_database = thuongmaidientu;

create login NV004
with password = '123',
default_database = thuongmaidientu;

--==========================================

-- Tạo login cho QUẢN TRỊ
use master;
go
create login QT001
with password = '123',
default_database = thuongmaidientu;

create login QT002
with password = '123',
default_database = thuongmaidientu;

create login QT003
with password = '123',
default_database = thuongmaidientu;

create login QT004
with password = '123',
default_database = thuongmaidientu;


--====================== TẠO USER ======================-- 

use thuongmaidientu
go
create user DoiTac001 for login DT001
create user DoiTac002 for login DT002
create user DoiTac003 for login DT003
create user DoiTac004 for login DT004
create user DoiTac005 for login DT005
go

use thuongmaidientu
go
create user KhachHang001 for login KH001
create user KhachHang002 for login KH002
create user KhachHang003 for login KH003
create user KhachHang004 for login KH004
create user KhachHang005 for login KH005
go

use thuongmaidientu
go
create user TaiXe001 for login TX001
create user TaiXe002 for login TX002
create user TaiXe003 for login TX003
create user TaiXe004 for login TX004
go

use thuongmaidientu
go
create user NhanVien001 for login NV001
create user NhanVien002 for login NV002
create user NhanVien003 for login NV003
create user NhanVien004 for login NV004
go

use thuongmaidientu
go
create user QuanTri001 for login QT001
create user QuanTri002 for login QT002
create user QuanTri003 for login QT003
create user QuanTri004 for login QT004
go

--====================== TẠO ROLE ======================--

use thuongmaidientu
go
create role DoiTac
create role KhachHang
create role TaiXe
create role NhanVien
create role QuanTri
go

use thuongmaidientu
go
alter role DoiTac add member DoiTac001
alter role DoiTac add member DoiTac002
alter role DoiTac add member DoiTac003
alter role DoiTac add member DoiTac004
alter role DoiTac add member DoiTac005
go

use thuongmaidientu
go
alter role KhachHang add member KhachHang001
alter role KhachHang add member KhachHang002
alter role KhachHang add member KhachHang003
alter role KhachHang add member KhachHang004
alter role KhachHang add member KhachHang005
go

use thuongmaidientu
go
alter role QuanTri add member QuanTri001
alter role QuanTri add member QuanTri002
alter role QuanTri add member QuanTri003
alter role QuanTri add member QuanTri004
go

use thuongmaidientu
go
alter role NhanVien add member NhanVien001
alter role NhanVien add member NhanVien002
alter role NhanVien add member NhanVien003
alter role NhanVien add member NhanVien004
go

use thuongmaidientu
go
alter role TaiXe add member TaiXe001
alter role TaiXe add member TaiXe002
alter role TaiXe add member TaiXe003
alter role TaiXe add member TaiXe004
go

-- =========================================================
-- Đối tác
use thuongmaidientu
go
grant select on OBJECT::DOITAC to DoiTac
grant select on OBJECT::HOPDONG to DoiTac

grant select on OBJECT::THUCDON to DoiTac
grant select on OBJECT::MONAN to DoiTac
grant select on OBJECT::TUYCHON to DoiTac
grant select on OBJECT::DONDATHANG to DoiTac
grant select on OBJECT::CUAHANG to DoiTac
grant select on OBJECT::CHITIETDONHANG to DoiTac
grant select, update on OBJECT::DONDATHANG to DoiTac

grant execute on OBJECT::dbo.USP_DANGKYTHONGTIN to DoiTac
grant execute on OBJECT::dbo.USP_QUANLICUAHANG to DoiTac
grant execute on OBJECT::dbo.USP_THEMMONAN to DoiTac
grant execute on OBJECT::dbo.USP_QUANLITHUCDON to DoiTac
grant execute on OBJECT::dbo.USP_XOAMONAN to DoiTac
grant execute on OBJECT::dbo.USP_CAPNHATTRANGTHAI to DoiTac

go

-- ========================================================
-- Tài xế
use thuongmaidientu
go
grant select on OBJECT::TAIXE to TaiXe
grant select, update on OBJECT::DONDATHANG to TaiXe

grant execute on OBJECT::dbo.USP_DANGKYTAIXE to TaiXe
grant execute on OBJECT::dbo.USP_CAPNHATTRANGTHAI to TaiXe
grant select on OBJECT::DONDATHANG to TaiXe

go

-- ========================================================
-- Khách hàng
use thuongmaidientu
go
grant select on OBJECT::KHACHHANG to KhachHang
grant select, update on OBJECT::MONAN to KhachHang
grant select on OBJECT::TUYCHON to KhachHang
grant select on OBJECT::DONDATHANG to KhachHang
grant select on OBJECT::CHITIETDONHANG to KhachHang
grant select on OBJECT::DOITAC to KhachHang
grant select on OBJECT::THUCDON to KhachHang
grant select on OBJECT::CUAHANG to KhachHang

grant execute on OBJECT::dbo.USP_DANGKYKHACHHANG to KhachHang
grant execute on OBJECT::dbo.USP_DATHANG to KhachHang
grant execute on OBJECT::dbo.USP_HUYDONHANG to KhachHang

go

-- ========================================================
-- Nhân viên
use thuongmaidientu
go
grant select on OBJECT::NHANVIEN to NhanVien
grant select on OBJECT::KHACHHANG to NhanVien
grant select on OBJECT::HOPDONG to NhanVien

grant execute on OBJECT::dbo.USP_LAPHOPDONG to NhanVien

go

--=========================================================
-- Admin
use thuongmaidientu
go

grant execute on OBJECT::dbo.USP_CAPNHATTAIXE to QuanTri
grant execute on OBJECT::dbo.USP_CAPNHATKHACHHANG to QuanTri
grant execute on OBJECT::dbo.USP_CAPNHATDOITAC to QuanTri
grant execute on OBJECT::dbo.USP_CAPNHATNHANVIEN to QuanTri 

grant select, update on OBJECT::DOITAC to QuanTri with grant option
grant select, update on OBJECT::KHACHHANG to QuanTri with grant option
grant select, update on OBJECT::TAIXE to QuanTri with grant option
grant select, insert, delete, update on OBJECT::NHANVIEN to QuanTri with grant option
grant select, insert, delete, update on OBJECT::QUANTRI to QuanTri with grant option

go
