const db = require("../models");

const getmyinfo = async (req, res) => {
  const myId = req.user.user_id;

  const myinfo = await db.User.findOne({
    where: { user_id: myId },
    attributes: ["username", "password", "name", "lastname", "email"],
  });

  if (myinfo) {
    res.status(200).send({ mydata });
  } else {
    res.status(404).send({ message: "something went wrong" });
  }
};

const getmybill = async (req, res) => {
  const myId = req.user.user_id;

  const mybill = await db.Bill.findAll({
    where: { user_id: myId },
    order: [["start_date", "DESC"]],
    attributes: [
      "bill_no",
      "user_id",
      "car_id",
      "start_date",
      "end_date",
      "amout",
      "total",
      "createdAt",
      "updatedAt",
    ],
  });

  if (mybill) {
    res.status(200).send({mybill});
  } else {
    res.status(404).send({ message: "something went wrong" });
  }
};

module.exports = {
  getmyinfo,
  getmybill,
};
