const mongoose = require("mongoose");

const nhaXuatBanSchema = mongoose.Schema(
    {
        _id: {
            type: String,
            required: true,
            primaryKey: true,
        },
        MANXB: {
            type: String,
            required: true,
            primaryKey: true
        },
        TENNXB: {
            type: String,
            required: [true, 'Vui lòng nhập tên nhà xuất bản!'],
            unique: [true, "Tên nhà xuất bản đã tồn tại!"]
        },
        DIACHI: {
            type: String,
            required: [true, 'Vui lòng nhập địa chỉ!'],
        }
    }
);
module.exports = mongoose.model("NHAXUATBAN", nhaXuatBanSchema);
