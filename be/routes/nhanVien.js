const router = require("express").Router();
const nhanVienControllers = require('../controllers/nhanVienControllers')

router.post('/register', nhanVienControllers.register)
router.post('/login', nhanVienControllers.logIn)
router.get('/all', nhanVienControllers.getAll)
router.get('/count', nhanVienControllers.getCount)
router.get('/detail', nhanVienControllers.getOne)

module.exports = router;