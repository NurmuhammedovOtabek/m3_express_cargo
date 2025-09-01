const { addAdmin, getAdmin, getByIdAdmin, updateAdmin, deleteAdmin } = require("../controllers/admin.controller")

const router = require("express").Router()

router.post("/", addAdmin)
router.get("/", getAdmin)
router.get("/:id", getByIdAdmin)
router.patch("/:id", updateAdmin)
router.delete("/:id", deleteAdmin)

module.exports = router