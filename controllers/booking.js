const db = require("../models");
const { Op } = require("sequelize");

const getAvailableCar = async (req, res) => {
  const allCar = await db.Car.findAll({
    where: { available: true },
    order: [["car_brand", "DESC"]],
    attributes: ["car_number", "car_name", "car_brand"],
  });
  res.status(201).send(allCar);
};

const booking = async (req, res) => {
  const { start_date, end_date, amout, total, car_number } = req.body;
  const myId = req.user.user_id;

  const bookingcar = await db.Car.findOne({
    where: {
      [Op.and]: [{ car_number: car_number }, { available: true }],
    },
  });
  if (bookingcar) {
    const newBooking = await db.Bill.create({
      start_date,
      end_date,
      amout,
      total,
      car_number,
      user_id: myId,
    });

    res.status(201).send("newBooking");
  } else if (car_number) {
    res.status(400).send({ message: "unavailable" });
  } else {
    res.status(400).send({ message: "something went wrong" });
  }
};

const canclebook = async (req, res) => {
  const bill = Number(req.params.bill);
  const canclebookCar = await db.Bill.findOne({
    where: {
      bill_no: bill,
    },
  });

  if (canclebookCar.user_id === req.user.user_id) {
    await canclebookCar.destroy();
    res.status(200).send({ message: "destroy success" });
  } else {
    res.status(404).send({ message: "ไม่มีสิทธิ์นะ" });
  }
};

module.exports = {
  getAvailableCar,
  booking,
  canclebook,
};
