const express = require("express");
const router = express.Router();

const controllers = require("../controllers/reservation")

router.post("/",controllers.reserve)

module.exports = router;