# doc gia
- POST api/v1/docGia/register -> dang ky
- POST api/v1/docGia/login -> dang nhap
- PUT api/v1/docGia/abc -> chinh sua doc gia co MADOCGIA = abc
    + MADOCGIA: String
- GET api/v1/docGia/detail?MADOCGIA=abc -> lay thong tin doc gia co MADOCGIA = abc
    + MADOCGIA: String
- GET api/v1/docGia/all -> lay thong tin tat ca doc gia
- GET api/v1/docGia/count -> lay so luong doc gia

# hinh anh
- POST api/v1/hinhAnh -> them hinh anh moi
- DELETE api/v1/hinhAnh/abc -> xoa hinh anh co MAHA = abc
    + MAHA: String
- PUT api/v1/hinhAnh/abc -> cap nhat hinh anh co MAHA = abc
    + MAHA: String
- GET api/v1/hinhAnh/abc -> lay tat ca hinh anh cua sach co MASACH = abc
    + MASACH: String

# nhan vien
- POST api/v1/nhanVien/register -> dang ky
- POST api/v1/nhanVien/login -> dang nhap
- GET api/v1/nhanVien/all -> lay thong tin tat ca nhan vien
- GET api/v1/nhanVien/count -> lay so luong nhan vien
- GET api/v1/nhanVien/detail?MSNV=abc -> lay thong tin nhan vien co MSNV = abc

# nha xuat ban
- POST api/v1/nhaXuatBan -> them moi nha xuat ban
- PUT api/v1/nhaXuatBan/abc -> chinh sua nha xuat ban co MANXB = abc
- GET api/v1/nhaXuatBan/info?MANXB=abc -> lay thong tin nha xuat ban co MANXB = abc
- GET api/v1/nhaXuatBan/all -> lay tat ca thong tin nha xuat ban

# sach
- POST api/v1/sach -> them moi sach
- PUT api/v1/sach/abc -> cap nhat thong tin sach co MASACH = abc
- GET api/v1/sach/all?page=1&limit=6 -> lay tat ca sach theo trang (moi trang co 6 phan tu)
    + page: int -> co the co hoac khong (page > 0)
    + limit: int -> co the co hoac khong (page > 0)
- GET api/v1/sach/detail?MASACH=abc -> lay thong tin sach co MASACH = abc
    + MASACH: String
- GET api/v1/sach/count -> lay thong so luong sach
- GET api/v1/sach/search?type=name&key=abc&apge=1 -> tim kiem sach dua tren thong tin cup cap
    + name: String -> loai tim kiem, nhan vao 2 gia tri name va author
    + key: String -> tu khoa tim kiem
    + page: int -> co the co hoac khong (page > 0)
- GET api/v1/sach/allBy?MANXB=abc&page=1&limit=6 -> lay tat ca sach theo MANXB duoc phan trang (moi trang co 6 phan tu)
    + MANXB: String -> bat buoc phai co
    + page: int -> co the co hoac khong (page > 0)
    + limit: int -> co the co hoac khong (page > 0) 
- GET api/v1/sach/random -> lay ngau nhien 8 quyen sach

# theo doi muon sach
- POST api/v1/theoDoiMuonSach -> them moi TDMS
- PUT api/v1/theoDoiMuonSach/edit?MADOCGIA=abc&MASACH=bcd&NGAYMUON=2023-01-01 -> cap nhat TDMS co MADOCGIA = abc, MASACH = bcd va NGAYMUON = 2023-01-01
    + MADOCGIA: String
    + MASACH: String
    + NGAYMUON: Date
- GET api/v1/theoDoiMuonSach/all?page=1&status=1 -> lay tat ca TDMS (theo page = 1, trang thai = 1)
    + page: int -> co the co hoac khong (page > 0)
    + status: int -> co the co hoac khong (nhan vao gia tri 0, 1, 2)
- GET api/v1/theoDoiMuonSach/detail?MADOCGIA=abc&MASACH=bcd&NGAYMUON=2023-01-01 -> lay thong tin TDMS co MADOCGIA = abc, MASACH = bcd va NGAYMUON = 2023-01-01
    + MADOCGIA: String
    + MASACH: String
    + NGAYMUON: Date
- GET api/v1/theoDoiMuonSach/count -> dem so luong TDMS
