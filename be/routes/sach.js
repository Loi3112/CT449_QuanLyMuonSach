const router = require("express").Router();
const sachControllers = require('../controllers/sachControllers')

router.post('/', sachControllers.create)
router.put('/:MASACH', sachControllers.edit)
router.get('/all', sachControllers.getAll)
router.get('/detail', sachControllers.getOne)
router.get('/count', sachControllers.getCount)
router.get('/search', sachControllers.search)
router.get('/allBy', sachControllers.getAllByMANXB)
router.get('/random', sachControllers.getRandom)
router.delete('/:MASACH', sachControllers.delete);
module.exports = router;