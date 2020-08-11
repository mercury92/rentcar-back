const db = require("../models");
const bc = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  console.log(req.body);
  const { username, password, name, lastname, email, address } = req.body;
  const targetUser = await db.User.findOne({ where: { username } });

  if (targetUser) {
    res.status(400).send({ message: "username already used" });
  } else {
    const salt = bc.genSaltSync(Number(process.env.ROUNDS));
    const hashedPW = bc.hashSync(password, salt);

    await db.User.create({
      username,
      name,
      lastname,
      email,
      password: hashedPW,
    });
  }

  res.status(201).send({ message: "user created" });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const targetUser = await db.User.findOne({ where: { username } });

  if (!targetUser) {
    res.status(400).send({ message: "Username or Password not correct" });
  } else {
    const isPWCorrect = bc.compareSync(password, targetUser.password);

    if (isPWCorrect) {
      const payload = { id: targetUser.user_id, name: targetUser.name };
      const token = jwt.sign(payload, process.env.SECRET, { expiresIn: 36000 });

      res.status(200).send({
        message: "successfully login",
        access_token: token,
        accessToken: token, //for php
      });
    } else {
      res.status(400).send({ message: "Username or Password is wrong" });
    }
  }

  res.status(201).send({ message: "login success" });
};

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
  register,
  login,
  getmybill,
};
