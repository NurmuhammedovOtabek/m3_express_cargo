const { addOrder, getAllOrders, getByIdOrders, updateOrder, deleteOrder, shart1 } = require("../controllers/order.controller");
const authGuard = require("../middlewares/guards/auth.guard");

const router = require("express").Router();

router.post("/",authGuard, addOrder);
router.get("/",authGuard, getAllOrders);
router.get("/shart1",authGuard, shart1)
router.get("/:id",authGuard, getByIdOrders);
router.put("/:id",authGuard, updateOrder);
router.delete("/:id",authGuard, deleteOrder);


module.exports = router;
