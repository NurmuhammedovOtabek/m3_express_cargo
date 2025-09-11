const {
  addAdmin,
  getAdmin,
  getByIdAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/admin.controller");
const authGuard = require("../middlewares/guards/auth.guard");
const creatorGuard = require("../middlewares/guards/creator.guard");
const roleGuard = require("../middlewares/guards/role.guard");
const selfGuard = require("../middlewares/guards/self.guard");

const router = require("express").Router();

router.post("/", authGuard, creatorGuard, addAdmin);
router.get("/", authGuard, roleGuard("Admin"), getAdmin);
router.get("/:id", authGuard, selfGuard, getByIdAdmin);
router.patch("/:id", authGuard, selfGuard, updateAdmin);
router.delete("/:id", authGuard, selfGuard, deleteAdmin);

module.exports = router;
