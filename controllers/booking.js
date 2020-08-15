const db = require("../models");
const { Op } = require("sequelize");

const getCar = async (req, res) => {
  const { start_date, end_date } = req.params;
  const allCar = await db.Car.findAll({
    include: db.Bill,
    order: [["car_brand", "DESC"]],
    attributes: ["car_id", "car_name", "car_brand", "picture"],
  });
  console.log(allCar);

  const AvailableCar = await allCar.filter((car, index) => {
    let boo = true;
    car.Bills.forEach((bill) => {
      if (new Date(bill.start_date) >= new Date(end_date)) {
        return boo;
      } else {
        const startUnAvailable =
          new Date(bill.start_date) >= new Date(end_date);
        const endUnAvailable = new Date(bill.end_date) <= new Date(start_date);

        if (startUnAvailable || endUnAvailable) {
          boo = true;
        } else {
          boo = false;
        }
      }
    });
    return boo;
  });
  res.status(201).send(AvailableCar);
};

const createBooking = async (req, res) => {
  const { start_date, end_date, amout,total,car_id, status} = req.body;

  const targetCar = await db.Car.findOne({
    where: { car_id },
  });

  if (targetCar) {
    if (targetCar.available > amout) {
      
      const newAvailable = targetCar.available - Number(amout);
      await targetCar.update({
        available:newAvailable,
      });

      const newBooking = await db.Bill.create({
        start_date,
        end_date,
        amout,
        car_id,
        status,
        total,
        user_id: req.user.user_id,
      });
      res.status(201).send("newBooking");
    } else {
      res.status(200).send({ message: "unavailable" });
    }
  } else {
    res.status(400).send({ message: "something went wrong" });
  }

};



const deleteBooking = async (req, res) => {
  const bill = Number(req.params.bill);
  const targetCar = await db.Bill.findOne({
    where: {
      bill_no: bill,
    },
  });

  if (targetCar.user_id === req.user.user_id) {
    await targetCar.destroy();
    res.status(200).send({ message: "destroy success" });
  } else {
    res.status(401).send({ message: "unauthorized" });
  }
};


const editbooking = async (req, res) => {
  const { bill_no, car_id, total } = req.body;
  const targetBill = await db.Bill.findOne({ where: { bill_no } });

  if (!targetBill) {
    res.status(404).send({ message: `Not Found Bill ID: ${bill_no}` });
  } else {
    if (targetBill.user_id === req.user.user_id) {
      await targetBill.update({
        car_id,
        total,
      });

      res.status(200).send(targetBill);
    } else {
      res.status(401).send({ message: "แก้ไม่ได้อ่ะ" });
    }
  }
};

module.exports = {
  getCar,
  createBooking,
  deleteBooking,
  editbooking,
};
