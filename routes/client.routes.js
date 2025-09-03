const {
  addClient,
  getAllClients,
  getByIdClients,
  updateClient,
  deleteClient,
  shart3,
  shart4,
} = require("../controllers/client.controller");

const router = require("express").Router();

router.post("/", addClient);
router.get("/", getAllClients);
router.get("/shart3", shart3)
router.get("/shart4", shart4)
router.get("/:id", getByIdClients);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);

module.exports = router;
