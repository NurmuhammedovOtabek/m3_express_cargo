const { addOperation, getAllOperations, getByIdOperations, updateOperation, deleteOperation, shart2 } = require("../controllers/operation.controller")
const authGuard = require("../middlewares/guards/auth.guard")

const auth =require("../middlewares/guards/auth.guard")

const router = require("express").Router()

router.post("/",authGuard, addOperation)
router.get("/", authGuard,  getAllOperations)
router.get("/shart2",authGuard, shart2)
router.get("/:id",authGuard, getByIdOperations)
router.put("/:id",authGuard, updateOperation)
router.delete("/:id",authGuard, deleteOperation)

module.exports = router