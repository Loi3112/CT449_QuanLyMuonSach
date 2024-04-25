const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require('./config/connectDB');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', process.env.FEURL)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})

connectDB()

const path = (name) => `/api/v1/${name}`

app.use(path('docGia'), require('./routes/docGia'))

app.use(path('nhanVien'), require('./routes/nhanVien'))

app.use(path('nhaXuatBan'), require('./routes/nhaXuatBan'))

app.use(path('hinhAnh'), require('./routes/hinhAnh'))

app.use(path('sach'), require('./routes/sach'))

app.use(path('theoDoiMuonSach'), require('./routes/theoDoiMuonSach'))


app.listen(port, () => {
    console.log(`Server running on port ${port} (http://localhost:${port})`)
})
