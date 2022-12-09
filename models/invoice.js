var mongoose = require("mongoose");
const Joi = require("@hapi/joi");
var invoiceSchema = mongoose.Schema({
  date: String,
  company: String,
  carRegNo: String,
  namee: String,
  duedate: String,
  deliveryi: String,
  discount: Number,
  tax: Number,
  statuss: String,
  servicetype: String,
  price: Number,
  cartype: String,
  paymentinvoice: String,
  comments: String,
});
var Invoice = mongoose.model("Invoice", invoiceSchema);
module.exports.Invoice = Invoice;

function validateInvoice(data) {
  const schema = Joi.object({
    date: Joi.string().required(),
    company: Joi.string().min(3).max(15),
    carRegNo: Joi.string().min(3).max(15).required(),
    namee: Joi.string().min(3).max(30).required(),
    duedate: Joi.string().required(),
    phone: Joi.string()
      .length(11)
      .pattern(/^[0-9]+$/),
    deliveryi: Joi.string().required(),
    discount: Joi.number().min(0),
    tax: Joi.number().min(0),
    statuss: Joi.string().required(),
    servicetype: Joi.string().min(3).max(15).required(),
    price: Joi.number().min(0).required(),
    cartype: Joi.string().required(),
    paymentinvoice: Joi.string().required(),
    comments: Joi.string().min(5).max(150),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.Invoice = Invoice;
module.exports.validate = validateInvoice;
