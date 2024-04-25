const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const nhanVienModel = require('../models/nhanVien')

const nhanVienControllers = {
    // them nhan vien
    register: asyncHandler(async (req, res) => {
        const { HoTenNV, Password, ChucVu, DiaChi, SoDienThoai } = req.body;

        // kiem tra cac truong
        if (!HoTenNV || !Password || !ChucVu || !DiaChi || !SoDienThoai) {
            return res.status(400).json({
                errorCode: 1,
                message: "Tất cả các trường là bắt buộc!"
            });
        }

        // ma hoa mat khau
        const hashedPassword = await bcrypt.hash(Password, 10);

        try {
            // tao nhan vien
            const nhanVien = await nhanVienModel.create({
                HoTenNV,
                ChucVu,
                Password: hashedPassword,
                DiaChi,
                SoDienThoai
            });

            // kiem tra nhan vien vua tao
            if (nhanVien) {
                return res.status(200).json({
                    errorCode: 0,
                    message: "Đăng ký thành công!"
                })
            } else {
                return res.status(404).json({
                    errorCode: 2,
                    message: "Đăng ký thất bại!"
                });
            }
        } catch (err) {
            return res.status(500).json({
                errorCode: 3,
                message: "Lỗi server!",
                error: err.message
            })
        }
    }),
    // dang nhap nhan vien
    logIn: asyncHandler(async (req, res) => {
        const { Password, SoDienThoai } = req.body

        // kiem tra cac truong
        if (!Password || !SoDienThoai) {
            return res.status(400).json({
                errorCode: 1,
                message: "Tất cả các trường là bắt buộc!"
            });
        }

        try {
            // tim kiem nhan vien trong database
            const nhanVien = await nhanVienModel.findOne({ SoDienThoai })

            // so sanh mat khau
            if (nhanVien && (await bcrypt.compare(Password, nhanVien.Password))) {
                return res.status(200).json({
                    errorCode: 0,
                    message: 'Đăng nhập thành công!',
                    data: {
                        MSNV: nhanVien.MSNV,
                    }
                })
            } else {
                return res.status(404).json({
                    errorCode: 2,
                    message: "Số điện thoại hoặc mật khẩu không không khớp!"
                })
            }
        } catch (err) {
            return res.status(500).json({
                errorCode: 3,
                message: "Lỗi server!",
                error: err.message
            })
        }
    }),
    // dem so luong nhan vien
    getCount: asyncHandler(async (req, res) => {
        try {
            // dem so luong nhan vien
            const soLuong = await nhanVienModel.countDocuments()

            if (!isNaN(parseInt(soLuong))) {
                return res.status(201).json({
                    data: soLuong,
                    errorCode: 0,
                    message: "Lấy số lượng thành công!"
                })
            } else {
                return res.status(404).json({
                    errorCode: 2,
                    message: "Lấy số lượng thất bại!"
                })
            }
        } catch (err) {
            return res.status(500).json({
                errorCode: 3,
                message: "Lỗi server!",
                error: err.message
            })
        }
    }),
    // lay thong tin nhan vien
    getOne: asyncHandler(async (req, res) => {
        const { MSNV } = req.query

        // kiem tra ma so nhan vien
        if (!MSNV) {
            return res.status(400).json({
                errorCode: 1,
                message: "Không tồn tại mã số nhân viên!"
            })
        }

        try {
            // tim kiem nhan vien trong database
            const nhanVien = await nhanVienModel.findOne({ MSNV })

            if (nhanVien) {
                return res.status(200).json({
                    errorCode: 0,
                    data: {
                        MSNV: nhanVien.MSNV,
                        HoTenNV: nhanVien.HoTenNV,
                        ChucVu: nhanVien.ChucVu,
                        DiaChi: nhanVien.DiaChi,
                        SoDienThoai: nhanVien.SoDienThoai
                    },
                    message: 'Lấy thông tin nhân viên thành công!'
                })
            } else {
                return res.status(404).json({
                    errorCode: 2,
                    message: "Không thể lấy thông tin nhân viên!"
                })
            }
        } catch (err) {
            return res.status(500).json({
                errorCode: 3,
                message: "Lỗi server!",
                error: err.message
            })
        }
    }),
    // lay thong tin tat ca nhan vien
    getAll: asyncHandler(async (req, res) => {
        try {
            // danh sach nhan vien
            const DSNhanVien = await nhanVienModel.find()

            if (DSNhanVien) {
                const results = [];
                for (const nhanVien of DSNhanVien) {
                    const nv = {
                        MSNV: nhanVien.MSNV,
                        HoTenNV: nhanVien.HoTenNV,
                        ChucVu: nhanVien.ChucVu,
                        DiaChi: nhanVien.DiaChi,
                        SoDienThoai: nhanVien.SoDienThoai
                    }
                    results.push(nv)
                }
                return res.status(200).json({
                    errorCode: 0,
                    data: results,
                    message: 'Lấy thông tin tát cả nhân viên thành công!'
                })
            } else {
                return res.status(404).json({
                    errorCode: 2,
                    message: "Không thể lấy danh sách nhân viên!"
                })
            }
        } catch (err) {
            return res.status(500).json({
                errorCode: 3,
                message: "Lỗi server!",
                error: err.message
            })
        }
    }),
}

module.exports = nhanVienControllers