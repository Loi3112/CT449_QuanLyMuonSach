const mongoose = require("mongoose");

const theoDoiMuonSachSchema = mongoose.Schema(
    {
        MADOCGIA: {
            type: String,
            required: [true, 'Vui lòng nhập mã độc giả!'],
            primaryKey: true,
            ref: 'DOCGIA'
        },
        MASACH: {
            type: String,
            required: [true, 'Vui lòng nhập mã sách!'],
            primaryKey: true,
            ref: 'SACH'
        },
        NGAYMUON: {
            type: Date,
            required: [true, 'Vui lòng nhập ngày mượn!'],
            primaryKey: true
        },
        NGAYTRA: {
            type: Date,
            required: [true, 'Vui lòng nhập ngày trả!'],
        },
        TRANGTHAI: {
            type: Number,
            enum: [0, 1, 2],
            default: 0
        }
    }
);

theoDoiMuonSachSchema.path("NGAYMUON").validate(function (value) {
    return value <= this.NGAYTRA;
}, "Ngày mượn phải nhỏ hơn ngày trả!");

module.exports = mongoose.model("THEODOIMUONSACH", theoDoiMuonSachSchema);
