const express = require("express");
const router = express.Router();

const passport = require("passport")
require ("../config/passport")
const auth = passport.authenticate("jwt",{session:false});

const controllers = require("../controllers/booking")


router.get("/:start_date/:end_date",controllers.getAll)
router.post("/",auth,controllers.booking)
router.patch("/",auth,controllers.editbooking)
router.delete("/:bill",auth,controllers.canclebook)

module.exports = router;