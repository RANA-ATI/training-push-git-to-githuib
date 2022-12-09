const express = require("express");
let router = express.Router();
// const validateInvoice = require("../../middlewares/validateInvoice");
const auth = require("../../middlewares/auth");
const admin = require("../../middlewares/admin");
var { Invoice, validate } = require("../../models/invoice");
//get products

router.get("/", async (req, res) => {
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  let invoices = await Invoice.find().skip(skipRecords).limit(perPage);
  let total = await Invoice.countDocuments();
  return res.send({ total, invoices });
});

//get single products
router.get("/:id", async (req, res) => {
  try {
    let invoice = await Invoice.findById(req.params.id);
    if (!invoice)
      return res.status(400).send("Product With given ID is not present"); //when id is not present id db
    return res.send(invoice); //everything is ok
  } catch (err) {
    return res.status(400).send("Invalid ID"); // format of id is not correct
  }
});

//update a record
router.put("/:id", async (req, res) => {
  let { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let invoice = await Invoice.findById(req.params.id);
  invoice.date = req.body.date;
  invoice.company = req.body.company;
  invoice.carRegNo = req.body.carRegNo;
  invoice.namee = req.body.namee;
  invoice.duedate = req.body.duedate;
  invoice.deliveryi = req.body.deliveryi;
  invoice.discount = req.body.discount;
  invoice.tax = req.body.tax;
  invoice.statuss = req.body.statuss;
  invoice.servicetype = req.body.servicetype;
  invoice.price = req.body.price;
  invoice.cartype = req.body.cartype;
  invoice.paymentinvoice = req.body.paymentinvoice;
  invoice.comments = req.body.comments;
  await invoice.save();
  return res.send(invoice);
});
//update a record
router.delete("/:id", auth, admin, async (req, res) => {
  let invoice = await Invoice.findByIdAndDelete(req.params.id);
  return res.send(invoice);
});
//Insert a record
router.post("/", async (req, res) => {
  let { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let invoice = new Invoice();
  invoice.date = req.body.date;
  invoice.company = req.body.company;
  invoice.carRegNo = req.body.carRegNo;
  invoice.namee = req.body.namee;
  invoice.duedate = req.body.duedate;
  invoice.deliveryi = req.body.deliveryi;
  invoice.discount = req.body.discount;
  invoice.tax = req.body.tax;
  invoice.statuss = req.body.statuss;
  invoice.servicetype = req.body.servicetype;
  invoice.price = req.body.price;
  invoice.cartype = req.body.cartype;
  invoice.paymentinvoice = req.body.paymentinvoice;
  invoice.comments = req.body.comments;
  await invoice.save();

  // let invoicereturn = {
  //   date: invoice.date,
  //   company: invoice.company,
  //   carRegNo: invoice.carRegNo,
  //   namee: invoice.namee,
  //   duedate: invoice.duedate,
  //   deliveryi: invoice.deliveryi,
  //   discount: invoice.discount,
  //   tax: invoice.tax,
  //   statuss: invoice.statuss,
  //   servicetype: invoice.servicetype,
  //   price: invoice.price,
  //   price: invoice.cartype,
  //   paymentinvoice: invoice.paymentinvoice,
  //   comments: invoice.comments,
  // };
  return res.send(invoice);
});

module.exports = router;

// const express = require("express");
// let router = express.Router();
// const validateBooking = require("../../middlewares/validateBooking");
// const auth = require("../../middlewares/auth");
// const admin = require("../../middlewares/admin");
// var { Invoice } = require("../../models/invoice");
// //get products

// router.get("/", async (req, res) => {
//   let page = Number(req.query.page ? req.query.page : 1);
//   let perPage = Number(req.query.perPage ? req.query.perPage : 10);
//   let skipRecords = perPage * (page - 1);
//   let invoices = await Invoice.find().skip(skipRecords).limit(perPage);
//   let total = await Invoice.countDocuments();
//   return res.send({ total, invoices });
// });

// //get single products
// router.get("/:id", async (req, res) => {
//   try {
//     let invoice = await Invoice.findById(req.params.id);
//     if (!invoice)
//       return res.status(400).send("Product With given ID is not present"); //when id is not present id db
//     return res.send(invoice); //everything is ok
//   } catch (err) {
//     return res.status(400).send("Invalid ID"); // format of id is not correct
//   }
// });

// //update a record
// router.put("/:id", validateBooking, auth, admin, async (req, res) => {
//   let invoice = await Invoice.findById(req.params.id);
//   invoice.date = req.body.date;
//   invoice.company = req.body.company;
//   invoice.carRegNo = req.body.carRegNo;
//   invoice.namee = req.body.namee;
//   invoice.duedate = req.body.duedate;
//   invoice.deliveryi = req.body.deliveryi;
//   invoice.discount = req.body.discount;
//   invoice.tax = req.body.tax;
//   invoice.statuss = req.body.statuss;
//   invoice.comments = req.body.comments;
//   await invoice.save();
//   return res.send(invoice);
// });
// //update a record
// router.delete("/:id", auth, admin, async (req, res) => {
//   let invoice = await Invoice.findByIdAndDelete(req.params.id);
//   return res.send(invoice);
// });
// //Insert a record
// router.post("/", async (req, res) => {
//   let invoice = new Invoice();

//   invoice.date = req.body.date;
//   invoice.company = req.body.company;
//   invoice.carRegNo = req.body.carRegNo;
//   invoice.namee = req.body.namee;
//   invoice.duedate = req.body.duedate;
//   invoice.deliveryi = req.body.deliveryi;
//   invoice.discount = req.body.discount;
//   invoice.tax = req.body.tax;
//   invoice.statuss = req.body.statuss;
//   invoice.comments = req.body.comments;
//   await invoice.save();

//   let invoicereturn = {
//     date: invoice.date,
//     company: invoice.company,
//     carRegNo: invoice.carRegNo,
//     namee: invoice.namee,
//     duedate: invoice.duedate,
//     deliveryi: invoice.deliveryi,
//     discount: invoice.discount,
//     tax: invoice.tax,
//     statuss: invoice.statuss,
//     comments: invoice.comments,
//   };
//   return res.send(invoicereturn);
// });

// module.exports = router;
