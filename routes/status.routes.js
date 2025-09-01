const { createStatus, getStatus, getByIdStatus, updateStatus, deleteStatus } = require("../controllers/status.controller")

const router = require("express").Router()

router.post("/", createStatus)
router.get("/", getStatus)
router.get("/:id", getByIdStatus)
router.patch("/:id", updateStatus)
router.delete("/:id", deleteStatus)

module.exports=router