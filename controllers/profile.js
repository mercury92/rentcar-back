const db = require("../models");


const getmydata = async(req,res) => {
  const myId = req.user.user_id;
  const mydata = await db.User.findOne({
    where: { user_id: myId },
    // order: [["start_date", "DESC"]],
    attributes: [
      // "user_id",
      "username",
      "password",
      "name",
      "lastname",
      "email",
    ],
  
    })
    if (getmydata) {
      res.status(200).send({mydata});
    } else {
      res.status(404).send({ message: "ไม่มีอ่ะ" });
    }
  }

const getmybill = async (req, res) => {
    const myId = req.user.user_id;
    const myBillList = await db.Bill.findAll({
      where: { user_id: myId },
      order: [["start_date", "DESC"]],
      attributes: [
        "bill_no",
        "user_id",
        "car_number",
        "start_date",
        "end_date",
        "amout",
        "total",
        "createdAt",
        "updatedAt",
      ],
    });
  
    if (myBillList) {
      res.status(200).send({ myBillList });
    } else {
      res.status(404).send({ message: "หาไม่เจอหรอก" });
    }
  };  
  
  module.exports = {
    getmydata,
    getmybill
  };
  