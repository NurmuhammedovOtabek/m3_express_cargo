const { addOrder, getAllOrders, getByIdOrders, updateOrder, deleteOrder, shart1 } = require("../controllers/order.controller");

const router = require("express").Router();

router.post("/", addOrder);
router.get("/", getAllOrders);
router.get("/shart1", shart1)
router.get("/:id", getByIdOrders);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);


module.exports = router;
