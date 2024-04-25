const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const docGiaModel = require('../models/docGia')
const uuid = require('uuid');

const docGiaControllers = {
    // tao tai khoan doc gia
    register: asyncHandler(async (req, res) => {
        const { HOLOT, TEN, DIACHI, MATKHAU, DIENTHOAI } = req.body;

        // kiem tra cac truong
        if (!HOLOT || !TEN || !DIACHI || !MATKHAU || !DIENTHOAI) {
            return res.status(400).json({
                errorCode: 1,
                message: "Tất cả các trường là bắt buộc!"
            });
        }

        // ma hoa mat khau
        const hashedPassword = await bcrypt.hash(MATKHAU, 10);

        try {
            const id = uuid.v4()

            // tao khach hang
            const docGia = await docGiaModel.create({
                HOLOT,
                TEN,
                MATKHAU: hashedPassword,
                DIACHI,
                DIENTHOAI,
                _id: id,
                MADOCGIA: id
            });

            // kiem tra khach hang vua tao
            if (docGia) {
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
    // dang nhap tai khoan
    logIn: asyncHandler(async (req, res) => {
        const { MATKHAU, DIENTHOAI } = req.body


        // kiem tra cac truong
        if (!MATKHAU || !DIENTHOAI) {
            return res.status(400).json({
                errorCode: 1,
                message: "Tất cả các trường là bắt buộc!"
            });
        }

        try {
            // tim kiem doc gia trong database
            const docGia = await docGiaModel.findOne({ DIENTHOAI })

            // so sanh mat khau
            if (docGia && (await bcrypt.compare(MATKHAU, docGia.MATKHAU))) {
                return res.status(201).json({
                    errorCode: 0,
                    data: {
                        MADOCGIA: docGia.MADOCGIA
                    },
                    message: "Đăng nhập thành công!"
                })
            } else {
                return res.status(404).json({
                    errorCode: 2,
                    message: "Số điện thoại hoặc mật khẩu không khớp!"
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
    // chinh sua thong tin doc gia
    edit: asyncHandler(async (req, res) => {
        const { MADOCGIA } = req.params
        const { HOLOT, TEN, DIACHI, NGAYSINH, PHAI } = req.body;

        const checkRole = (data) => !isNaN(parseInt(data)) && [0, 1, 2].indexOf(data) !== -1

        // kiem tra cac truong
        if (!HOLOT || !TEN || !DIACHI || !NGAYSINH || !MADOCGIA || !checkRole(PHAI)) {
            return res.status(400).json({
                errorCode: 1,
                data: {
                    PHAI,
                    MADOCGIA
                },
                message: "Tất cả các trường là bắt buộc!"
            })
        }

        try {
            // tim kiem va cap nhat theo MADOCGIA
            const docGia = await docGiaModel.findOneAndUpdate(
                { MADOCGIA },
                {
                    $set: {
                        HOLOT,
                        TEN,
                        DIACHI,
                        NGAYSINH,
                        PHAI
                    }
                },
                { new: true }
            )

            // kiem tra doc gia vua cap nhat
            if (docGia) {
                return res.status(201).json({
                    errorCode: 0,
                    data: {
                        MADOCGIA: docGia.MADOCGIA,
                        HOLOT: docGia.HOLOT,
                        TEN: docGia.TEN,
                        NGAYSINH: docGia.NGAYSINH,
                        PHAI: docGia.PHAI,
                        DIACHI: docGia.DIACHI,
                        DIENTHOAI: docGia.DIENTHOAI,
                    },
                    message: "Cập nhật thông tin độc giả thành công!"
                })
            } else {
                return res.status(404).json({
                    errorCode: 2,
                    message: "Cập nhật thất bại!"
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
    delete: asyncHandler(async (req, res) => {
        const { MADOCGIA } = req.params;

        try {
            const deletedDocGia = await docGiaModel.findByIdAndDelete(MADOCGIA);

            if (deletedDocGia) {
                return res.status(200).json({
                    message: "Đã xóa thành công đọc giả",
                    errorCode: 0
                });
            } else {
                return res.status(404).json({
                    message: "Không tìm thấy ",
                    errorCode: 1
                });
            }
        } catch (err) {
            return res.status(500).json({
                message: "Lỗi server",
                errorCode: 2,
                error: err.message
            });
        }
    }),
    getOne: asyncHandler(async (req, res) => {
        const { MADOCGIA } = req.query

        // kiem tra ma doc gia
        if (!MADOCGIA) {
            return res.status(400).json({
                errorCode: 1,
                message: "Không tồn tại mã độc giả!"
            })
        }

        try {

            const docGia = await docGiaModel.findOne({ MADOCGIA })

            if (docGia) {
                return res.status(201).json({
                    errorCode: 0,
                    data: {
                        MADOCGIA: docGia.MADOCGIA,
                        HOLOT: docGia.HOLOT,
                        TEN: docGia.TEN,
                        NGAYSINH: docGia.NGAYSINH,
                        PHAI: docGia.PHAI,
                        DIACHI: docGia.DIACHI,
                        DIENTHOAI: docGia.DIENTHOAI,
                    },
                    message: "Lấy thông tin độc giả thành công!"
                })
            } else {
                return res.status(404).json({
                    errorCode: 2,
                    message: "Lấy thông tin độc giả thất bại!"
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
    // lay so luong doc gia
    getCount: asyncHandler(async (req, res) => {
        try {
            // dem so luong doc gia
            const soLuong = await docGiaModel.countDocuments()

            if (!isNaN(parseInt(soLuong))) {
                return res.status(201).json({
                    data: soLuong,
                    errorCode: 0,
                    message: 'Đếm số lượng thành công!'
                })
            } else {
                return res.status(404).json({
                    message: "Không thể đếm số lượng!",
                    errorCode: 2
                })
            }
        } catch (err) {
            return res.status(500).json({
                message: "Lỗi server!",
                error: err.message,
                errorCode: 3
            })
        }
    }),
    // lay tat ca doc gia
    getAll: asyncHandler(async (req, res) => {
        try {
            // danh sach doc gia
            const DSdocGia = await docGiaModel.find()

            if (DSdocGia) {
                const results = [];
                for (const docGia of DSdocGia) {
                    const kh = {
                        MADOCGIA: docGia.MADOCGIA,
                        HOLOT: docGia.HOLOT,
                        TEN: docGia.TEN,
                        NGAYSINH: docGia.NGAYSINH,
                        PHAI: docGia.PHAI,
                        DIACHI: docGia.DIACHI,
                        DIENTHOAI: docGia.DIENTHOAI,
                    }
                    results.push(kh)
                }
                return res.status(201).json({
                    errorCode: 0,
                    data: results,
                    message: 'Lấy thông tin tát cả người dùng thành công!'
                })
            } else {
                return res.status(404).json({
                    errorCode: 2,
                    message: "Không thể lấy danh sách khách hàng!"
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

module.exports = docGiaControllers