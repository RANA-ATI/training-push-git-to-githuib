var mongoose = require("mongoose");
const Joi = require("@hapi/joi");
var bookingSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  address: String,
  phone: String,
  delivery: String,
  payment: String,
  vehicleType: String,
  carReg: String,
  carMake: String,
  carModel: String,
  product: String,
  timeb: String,
  priceb: Number,
  textMessage: String,
});
var Booking = mongoose.model("Clientbooking", bookingSchema);

function validateBooking(data) {
  const schema = Joi.object({
    firstName: Joi.string()
      .regex(/^[a-zA-Z]*$/)
      .min(3)
      .max(30)
      .required(),
    lastName: Joi.string()
      .regex(/^[a-zA-Z]*$/)
      .min(3)
      .max(30)
      .required(),

    email: Joi.string().email().min(3).max(30).required(),
    address: Joi.string().min(3).max(100).required(),
    phone: Joi.string()
      .length(11)
      .pattern(/^[0-9]+$/),
    delivery: Joi.string().required(),
    payment: Joi.string().required(),
    vehicleType: Joi.string().required(),
    carReg: Joi.string().min(3).max(15).required(),
    carMake: Joi.string().min(3).max(15).required(),
    carModel: Joi.string().min(3).max(15).required(),
    product: Joi.string().required(),
    timeb: Joi.string().required(),
    priceb: Joi.number().min(0).required(),
    textMessage: Joi.string().min(5).max(150),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.Booking = Booking;
module.exports.validate = validateBooking;
