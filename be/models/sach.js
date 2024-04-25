const mongoose = require("mongoose");

const sachSchema = mongoose.Schema(
    {
        _id: {
            type: String,
            required: true,
            primaryKey: true,
        },
        MASACH: {
            type: String,
            required: true,
            primaryKey: true
        },
        TENSACH: {
            type: String,
            required: [true, 'Vui lòng nhập tên sách!'],
        },
        DONGIA: {
            type: Number,
            required: [true, 'Vui lòng nhập đơn giá!'],
        },
        SOQUYEN: {
            type: Number,
            required: [true, 'Vui lòng nhập số quyển!']
        },
        NAMXUATBAN: {
            type: Number,
            required: [true, 'Vui lòng nhập năm xuất bản!'],
        },
        MANXB: {
            type: String,
            ref: 'NHAXUATBAN',
            required: [true, 'Vui lòng nhập mã nhà xuất bản!'],
            localField: 'MANXB',
            foreignField: 'MANXB',
        },
        TACGIA: {
            type: String,
            required: [true, 'Vui lòng nhập tác giả!'],
        }
    },
    {
        strictPopulate: false,
    }
);

module.exports = mongoose.model("SACH", sachSchema);
