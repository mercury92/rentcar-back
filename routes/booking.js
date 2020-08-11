const express = require("express");
const router = express.Router();

const controllers = require("../controllers/booking")

router.get("/",controllers.getAvailableCar)
router.post("/",controllers.booking)
router.delete("/:bill",controllers.canclebook)


module.exports = router;