require("dotenv").config();
require ("./config/passport")

const express = require("express");
const db = require("./models");
const cors = require("cors");
const passport = require("passport")
const app = express();



const auth = passport.authenticate("jwt",{session:false});

let allowdOrgins = ["http://localhost:3000"];

const userRoutes = require("./routes/user");
const bookingRoutes = require("./routes/booking");
const reserveRoutes = require("./routes/reservation");
const profileRoutes = require("./routes/profile")

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowdOrgins.indexOf(origin) === -1) {
        let mes = "you can not access";
        return callback(new Error(mes), false);
      }
      return callback(null, true);
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user",userRoutes);
app.use("/profile",auth,profileRoutes)
app.use("/booking", bookingRoutes);
app.use("/reservation",auth, reserveRoutes);


db.sequelize.sync({ force:false})
.then(() => {
  app.listen(process.env.PORT,
    () => {
      console.log(`server is running at port:${process.env.PORT}`);
    });
}).catch(err => console.log(err.message));
