const express = require("express");
let router = express.Router();
// const validateBooking = require("../../middlewares/validateBooking");
const auth = require("../../middlewares/auth");
const admin = require("../../middlewares/admin");
var { Booking, validate } = require("../../models/booking");
//get products

router.get("/", async (req, res) => {
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  let booking = await Booking.find().skip(skipRecords).limit(perPage);
  let total = await Booking.countDocuments();
  return res.send({ total, booking });
});

//get single products
router.get("/:id", async (req, res) => {
  try {
    let booking = await Booking.findById(req.params.id);
    if (!booking)
      return res.status(400).send("Product With given ID is not present"); //when id is not present id db
    return res.send(booking); //everything is ok
  } catch (err) {
    return res.status(400).send("Invalid ID"); // format of id is not correct
  }
});

//update a record
router.put("/:id", async (req, res) => {
  let { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let booking = await Booking.findById(req.params.id);
  booking.firstName = req.body.firstName;
  booking.lastName = req.body.lastName;
  booking.email = req.body.email;
  booking.address = req.body.address;
  booking.phone = req.body.phone;
  booking.delivery = req.body.delivery;
  booking.payment = req.body.payment;
  booking.vehicleType = req.body.vehicleType;
  booking.carReg = req.body.carReg;
  booking.carMake = req.body.carMake;
  booking.carModel = req.body.carModel;
  booking.product = req.body.product;
  booking.timeb = req.body.timeb;
  booking.priceb = req.body.priceb;
  booking.textMessage = req.body.textMessage;
  await booking.save();
  return res.send(booking);
});
//delete a record
router.delete("/:id", auth, admin, async (req, res) => {
  let booking = await Booking.findByIdAndDelete(req.params.id);
  return res.send(booking);
});

//Insert a record
router.post("/", async (req, res) => {
  let { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let booking = new Booking();
  booking.firstName = req.body.firstName;
  booking.lastName = req.body.lastName;
  booking.email = req.body.email;
  booking.address = req.body.address;
  booking.phone = req.body.phone;
  booking.delivery = req.body.delivery;
  booking.payment = req.body.payment;
  booking.vehicleType = req.body.vehicleType;
  booking.carReg = req.body.carReg;
  booking.carMake = req.body.carMake;
  booking.carModel = req.body.carModel;
  booking.product = req.body.product;
  booking.timeb = req.body.timeb;
  booking.priceb = req.body.priceb;
  booking.textMessage = req.body.textMessage;
  await booking.save();

  // let bookingreturn = {
  //   firstName: booking.firstName,
  //   lastName: booking.lastName,
  //   email: booking.email,
  //   address: booking.address,
  //   phone: booking.phone,
  //   delivery: booking.delivery,
  //   payment: booking.payment,
  //   vehicleType: booking.vehicleType,
  //   carReg: booking.carReg,
  //   carMake: booking.carMake,
  //   carModel: booking.carModel,
  //   product: booking.product,
  //   timeb: booking.timeb,
  //   priceb: booking.priceb,
  //   textMessage: booking.textMessage,
  // };
  return res.send(booking);
});
module.exports = router;
