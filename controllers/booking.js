const db = require("../models");
const { Op } = require("sequelize");

const getAll = async (req, res) => {
  const { start_date, end_date } = req.params;
 console.log(start_date,end_date)
  const allCar = await db.Car.findAll({
    include: db.Bill,
    where: { available: true },
    order: [["car_brand", "DESC"]],
    attributes: ["car_number", "car_name", "car_brand", "picture"],
  });

  
  const carAvailable2 = await allCar.filter((car, index) => {
    let boo = true;

    car.Bills.forEach((bill) => {

      if(new Date(bill.start_date) >= new Date(end_date)){
        return boo
      }
      else{
        const startUnAvailable = new Date(bill.start_date) >= new Date(end_date)
      const endUnAvailable = new Date(bill.end_date) <=  new Date(start_date)
        
      console.log('startdateDB[>]endateUser',startUnAvailable ,'endateDb[<]startdateUser',endUnAvailable)

      if (startUnAvailable || endUnAvailable){
         boo = true;
         console.log("available")
      }  
      else{
        boo = false;
        console.log("unavailable")
      } 
      }

      

      
    });

    return boo;
  });

  // console.log(carAvailable2)
    res.status(201).send(carAvailable2);
};

// getAvailableCar

const booking = async (req, res) => {
  const { start_date, end_date, Amout, car_number, status } = req.body;
  const myId = req.user.user_id;

  const bookingcar = await db.Car.findOne({
    where: {
      [Op.and]: [{ car_number: car_number }, { available: true }],
    },
  });
  console.log(bookingcar);
  if (bookingcar) {
    const newBooking = await db.Bill.create({
      start_date,
      end_date,
      amout:1,
      car_number,
      user_id: myId,
      status,
      total:0,
    });

    res.status(201).send("newBooking");
  } else if (car_number) {
    res.status(400).send({ message: "unavailable" });
  } else {
    res.status(400).send({ message: "something went wrong" });
  }

  await bookingcar.update({
    amout:Amout
  });
};

const editbooking = async (req, res) => {
  const { bill_no, car_number, total } = req.body;
  const targetBill = await db.Bill.findOne({ where: { bill_no } });

  if (!targetBill) {
    res.status(404).send({ message: `Not Found Bill ID: ${bill_no}` });
  } else {
    if (targetBill.user_id === req.user.user_id) {
      await targetBill.update({
        car_number,
        total,
      });

      res.status(200).send(targetBill);
    } else {
      res.status(401).send({ message: "แก้ไม่ได้อ่ะ" });
    }
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
  getAll,
  booking,
  canclebook,
  editbooking,
};
