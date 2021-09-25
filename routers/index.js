const express = require("express")
const router = express.Router()

const windcontroller = require("../controllers/index")

router.get("/",windcontroller.render)


router.get("/wind", windcontroller.getData )
router.get("/wind/add", windcontroller.AddData)

module.exports = router
