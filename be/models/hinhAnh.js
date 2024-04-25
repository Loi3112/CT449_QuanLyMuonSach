const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hinhAnhSchema = mongoose.Schema(
    {
        MAHA: {
            type: Schema.Types.ObjectId,
            required: true,
            auto: true,
            primaryKey: true
        },
        TENHA: {
            type: String,
            required: [true, 'Vui lòng nhập tên hình ảnh!'],
        },
        MASACH: {
            type: String,
            ref: 'SACH',
            required: [true, 'Vui lòng nhập mã sách!'],
            localField: 'MASACH',
            foreignField: 'MASACH',
        }
    }
);
module.exports = mongoose.model("HinhAnh", hinhAnhSchema);
