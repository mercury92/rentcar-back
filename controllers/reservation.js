const db = require("../models");

const reserve = async (req, res) => {
  const {car_number} = req.body;

  const reserveVehicle = await db.Car.findOne({
    where: {car_number:car_number},
  });
  if (reserveVehicle) {
    await reserveVehicle.update({ available:false});
    res.status(200).send({ message: "success" });
  } else {
    res.status(400).send({ message: "your booking was deny" });
  }
};


module.exports = {
  reserve,
};
