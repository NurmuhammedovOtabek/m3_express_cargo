const {
  addClient,
  getAllClients,
  getByIdClients,
  updateClient,
  deleteClient,
} = require("../controllers/client.controller");

const router = require("express").Router();

router.post("/", addClient);
router.get("/", getAllClients);
router.get("/:id", getByIdClients);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);

module.exports = router;
