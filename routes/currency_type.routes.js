const { createCurrency_t, getCurrency, getByIdCurrency, updateCurrency, deleteCurrency } = require("../controllers/currency_type.controller")

const router = require("express").Router()

router.post("/", createCurrency_t)
router.get("/", getCurrency)
router.get("/:id", getByIdCurrency)
router.put("/:id", updateCurrency)
router.delete("/:id", deleteCurrency)

module.exports = router