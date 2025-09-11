const router = require("express").Router()
const clientRouter = require("./client.routes")
const Currency_typeRouter = require("./currency_type.routes")
const StatusRouter = require("./status.routes")
const AdminRouter = require("./admin.routes")
const OrderRouts = require("./order.routes")
const Operationrouter = require("./operation.routes")
const AuthRouter = require("./auth.routes")

router.use("/client", clientRouter)
router.use("/currency_t", Currency_typeRouter)
router.use("/status", StatusRouter)
router.use("/admin", AdminRouter)
router.use("/order", OrderRouts)
router.use("/operation", Operationrouter)
router.use("/auth", AuthRouter)

module.exports = router