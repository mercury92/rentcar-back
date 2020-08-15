const db = require("../models");

const reserve = async (req, res) => {
  const {car_id} = req.body;

  const changeAvailable = await db.Car.findOne({
    where: {car_id:car_id},
  });
  const changePending = await db.Bill.findOne({
    where: {car_id:car_id},
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
