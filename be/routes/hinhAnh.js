const router = require("express").Router();
const hinhAnhControllers = require('../controllers/hinhAnhControllers')

router.post('/', hinhAnhControllers.create)
router.delete('/:MAHA', hinhAnhControllers.delete)
router.put('/:MAHA', hinhAnhControllers.edit)
router.get('/:MASACH', hinhAnhControllers.getByMaSach)

module.exports = router;