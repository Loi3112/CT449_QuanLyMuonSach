const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NhanVienSchema = mongoose.Schema(
    {
        MSNV: {
            type: Schema.Types.ObjectId,
            required: true,
            auto: true,
            primaryKey: true
        },
        HoTenNV: {
            type: String,
            required: [true, "Vui lòng thêm tên nhân viên!"]
        },
        Password: {
            type: String,
            required: [true, "Vui lòng thêm mật khẩu!"],
        },
        ChucVu: {
            type: String,
            required: [true, "Vui lòng thêm chức vụ!"],
        },
        DiaChi: {
            type: String,
            required: [true, "Vui lòng thêm địa chỉ!"]
        },
        SoDienThoai: {
            type: String,
            required: [true, "Vui lòng thêm số điện thoại!"],
            unique: [true, "Số điện thoại đã tồn tại!"]
        },
        Token: {
            type: String
        }
    }
)

module.exports = mongoose.model("NhanVien", NhanVienSchema);