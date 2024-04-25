const asyncHandler = require("express-async-handler")
const hinhAnhModel = require('../models/hinhAnh')

const hinhAnhControllers = {
    // them hinh anh moi
    create: asyncHandler(async (req, res) => {
        const { TENHA, MASACH } = req.body

        // kiem tra cac truong
        if (!TENHA || !MASACH) {
            return res.status(400).json({
                errorCode: 1,
                message: 'Tất cả các trường là bắt buộc!'
            })
        }

        try {
            // them moi hinh Anh
            const hinhAnh = await hinhAnhModel.create({
                TENHA, MASACH
            })

            if (hinhAnh) {
                return res.status(200).json({
                    message: "Thêm mới hình ảnh thành công!",
                    errorCode: 0
                })
            } else {
                return res.status(404).json({
                    message: "Thêm mới hình ảnh thất bại!",
                    errorCode: 2
                })
            }
        } catch (e) {
            return res.status(500).json({
                message: "Lỗi server!",
                errorCode: 3,
                error: e.message
            })
        }
    }),
    // xoa hinh anh
    delete: asyncHandler(async (req, res) => {
        const { MAHA } = req.params
        // kiem tra cac truong
        if (!MAHA) {
            return res.status(400).json({
                errorCode: 1,
                message: 'Tất cả các trường là bắt buộc!'
            })
        }

        try {
            // them moi hinh Anh
            const hinhAnh = await hinhAnhModel.findOneAndDelete({ MAHA })

            if (hinhAnh) {
                return res.status(200).json({
                    message: "Xóa hình ảnh thành công!",
                    errorCode: 0
                })
            } else {
                return res.status(404).json({
                    message: "Xóa hình ảnh thất bại!",
                    errorCode: 2
                })
            }
        } catch (e) {
            return res.status(500).json({
                message: "Lỗi server!",
                errorCode: 3,
                error: e.message
            })
        }

    }),
    // cap nhat hinh anh
    edit: asyncHandler(async (req, res) => {
        const { MAHA } = req.params
        const { TENHA, MASACH } = req.body

        // kiem tra cac truong
        if (!TENHA || !MASACH || !MAHA) {
            return res.status(400).json({
                errorCode: 1,
                message: 'Tất cả các trường là bắt buộc!'
            })
        }

        try {
            // them moi hinh Anh
            const hinhAnh = await hinhAnhModel.findOneAndUpdate(
                { MAHA },
                {
                    $set: {
                        TENHA,
                        MASACH
                    }
                },
                { new: true }
            )

            if (hinhAnh) {
                return res.status(201).json({
                    message: "Cập nhật hình ảnh thành công!",
                    data: hinhAnh,
                    errorCode: 0
                })
            } else {
                return res.status(404).json({
                    message: "Cập nhật hình ảnh thất bại!",
                    errorCode: 2
                })
            }
        } catch (e) {
            return res.status(500).json({
                message: "Lỗi server!",
                errorCode: 3,
                error: e.message
            })
        }
    }),
    // lay hinh anh theo ma sach
    getByMaSach: asyncHandler(async (req, res) => {
        const { MASACH } = req.params

        // kiem tra cac truong
        if (!MASACH) {
            return res.status(400).json({
                errorCode: 1,
                message: 'Tất cả các trường là bắt buộc!'
            })
        }

        try {
            // lay hinh anh theo ma sach
            const hinhAnh = await hinhAnhModel.find({ MASACH })

            if (hinhAnh) {
                return res.status(201).json({
                    message: "Lấy hình ảnh thành công!",
                    data: hinhAnh,
                    errorCode: 0
                })
            } else {
                return res.status(404).json({
                    message: "Lấy hình ảnh thất bại!",
                    errorCode: 2
                })
            }
        } catch (e) {
            return res.status(500).json({
                message: "Lỗi server!",
                errorCode: 3,
                error: e.message
            })
        }
    })
}

module.exports = hinhAnhControllers