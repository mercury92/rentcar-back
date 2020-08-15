const db = require("../models");

const reserve = async (req, res) => {
  const {car_number} = req.body;

  const changeAvailable = await db.Car.findOne({
    where: {car_number:car_number},
  });
  const changePending = await db.Bill.findOne({
    where: {car_number:car_number},
  })
  if (changeAvailable && changePending) {
    await changeAvailable.update({ available:false});
    await changePending.update({ status:confirm});
    res.status(200).send({ message: "success" });
  } else {
    res.status(400).send({ message: "something went wrong" });
  }
};


module.exports = {
  reserve,
};
