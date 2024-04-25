const router = require("express").Router();
const nhaXuatBanControllers = require('../controllers/nhaXuatBanControllers')

router.post('/', nhaXuatBanControllers.create)
router.put('/:MANXB', nhaXuatBanControllers.edit)
router.get('/all', nhaXuatBanControllers.getAll)
router.get('/info', nhaXuatBanControllers.getOne)

module.exports = router;