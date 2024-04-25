const mongoose = require("mongoose");

const docGiaSchema = mongoose.Schema(
    {
        _id: {
            type: String,
            required: true,
            primaryKey: true,
        },
        MADOCGIA: {
            type: String,
            required: true,
            primaryKey: true
        },
        HOLOT: {
            type: String,
            required: [true, 'Vui lòng nhập họ lót!'],
        },
        TEN: {
            type: String,
            required: [true, 'Vui lòng nhập tên!'],
        },
        NGAYSINH: {
            type: Date
        },
        PHAI: {
            type: Number,
            enum: [0, 1, 2],
            default: 0,
        },
        DIACHI: {
            type: String,
            required: [true, 'Vui lòng nhập địa chỉ!'],
        },
        DIENTHOAI: {
            type: String,
            required: [true, 'Vui lòng nhập số điện thoại!'],
            unique: [true, "Số điện thoại đã tồn tại!"]
        },
        MATKHAU: {
            type: String,
            required: [true, 'Vui lòng nhập mật khẩu!'],
        },
        Token: {
            type: String
        }
    }
);
module.exports = mongoose.model("DOCGIA", docGiaSchema);
