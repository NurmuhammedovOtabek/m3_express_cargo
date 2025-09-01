const router = require("express").Router()
const clientRouter = require("./client.routes")
const Currency_typeRouter = require("./currency_type.routes")
const StatusRouter = require("./status.routes")
const AdminRouter = require("./admin.routes")

router.use("/client", clientRouter)
router.use("/currency_t", Currency_typeRouter)
router.use("/status", StatusRouter)
router.use("/admin", AdminRouter)

module.exports = router