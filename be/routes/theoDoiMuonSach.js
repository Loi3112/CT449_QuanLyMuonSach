const router = require("express").Router();
const theoDoiMuonSachControllers = require('../controllers/theoDoiMuonSachControllers')

router.post('/', theoDoiMuonSachControllers.create)
router.put('/edit', theoDoiMuonSachControllers.edit)
router.get('/all', theoDoiMuonSachControllers.getAll)
router.get('/detail', theoDoiMuonSachControllers.getOne)
router.get('/count', theoDoiMuonSachControllers.getCount)

module.exports = router;