const asyncHandler = require("express-async-handler")
const nhaXuatBanModel = require('../models/nhaXuatBan')
const sachModel = require('../models/sach')
const uuid = require('uuid');

const nhaXuatBanControllers = {
    // them nha xuat ban moi
    create: asyncHandler(async (req, res) => {
        const { TENNXB, DIACHI } = req.body

        // kiem tra cac truong
        if (!TENNXB || !DIACHI) {
            return res.status(400).json({
                errorCode: 1,
                message: 'Tất cả các trường là bắt buộc!'
            })
        }

        try {
            const id = uuid.v4()
            // them moi nha xuat ban
            const nhaXuatBan = await nhaXuatBanModel.create({
                TENNXB, DIACHI, MANXB: id, _id: id
            })

            if (nhaXuatBan) {
                return res.status(200).json({
                    message: "Thêm mới nhà xuất bản thành công!",
                    errorCode: 0
                })
            } else {
                return res.status(404).json({
                    message: "Thêm mới nhà xuất bản thất bại!",
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
    // cap nhat nha xuat ban
    edit: asyncHandler(async (req, res) => {
        const { MANXB } = req.params
        const { TENNXB, DIACHI } = req.body

        // kiem tra cac truong
        if (!TENNXB || !DIACHI || !MANXB) {
            return res.status(400).json({
                errorCode: 1,
                message: 'Tất cả các trường là bắt buộc!'
            })
        }

        try {
            // cap nhat nha xuat ban
            const nhaXuatBan = await nhaXuatBanModel.findOneAndUpdate(
                { MANXB },
                {
                    $set: {
                        TENNXB,
                        DIACHI
                    }
                },
                { new: true }
            )

            if (nhaXuatBan) {
                return res.status(201).json({
                    message: "Cập nhật nhà xuất bản thành công!",
                    data: nhaXuatBan,
                    errorCode: 0
                })
            } else {
                return res.status(404).json({
                    message: "Cập nhật nhà xuất bản thất bại!",
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
    // lay tat ca nha xuat ban
    getAll: asyncHandler(async (req, res) => {
        try {
            // lay tat ca nha xuat ban
            const nhaXuatBan = await nhaXuatBanModel.find()

            if (nhaXuatBan) {
                // dem so luong sach cua tung nxb
                const results = []
                for (const nxb of nhaXuatBan) {
                    const count = await sachModel.countDocuments({ MANXB: nxb.MANXB })
                    results.push({
                        _id: nxb._id,
                        MANXB: nxb.MANXB,
                        TENNXB: nxb.TENNXB,
                        DIACHI: nxb.DIACHI,
                        count
                    })
                }

                return res.status(201).json({
                    message: "Lấy tất cả nhà xuất bản thành công!",
                    data: results,
                    errorCode: 0
                })
            } else {
                return res.status(404).json({
                    message: "Lấy tất cả nhà xuất bản thất bại!",
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
    // lay tat thong tin nha xuat ban
    getOne: asyncHandler(async (req, res) => {
        const { MANXB } = req.query

        // kiem tra ma nha xuat ban
        if (!MANXB) {
            return res.status(400).json({
                errorCode: 1,
                message: "Không tồn tại mã nhà xuất bản!"
            });
        }

        try {
            // lay tat thong tin nha xuat ban
            const nhaXuatBan = await nhaXuatBanModel.findOne({ MANXB })

            if (nhaXuatBan) {
                return res.status(201).json({
                    message: "Lấy thông tin nhà xuất bản thành công!",
                    data: nhaXuatBan,
                    errorCode: 0
                })
            } else {
                return res.status(404).json({
                    message: "Lấy thông tin nhà xuất bản thất bại!",
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

module.exports = nhaXuatBanControllers