const { addOperation, getAllOperations, getByIdOperations, updateOperation, deleteOperation, shart2 } = require("../controllers/operation.controller")

const router = require("express").Router()

router.post("/", addOperation)
router.get("/", getAllOperations)
router.get("/shart2", shart2)
router.get("/:id", getByIdOperations)
router.put("/:id", updateOperation)
router.delete("/:id", deleteOperation)

module.exports = router