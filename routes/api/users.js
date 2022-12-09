const express = require("express");
let router = express.Router();
let { User, validate, validateUserLogin } = require("../../models/user");
var bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("config");

//Register
router.post("/register", async (req, res) => {
  let { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User with given Email already exist");
  user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  await user.generateHashedPassword();
  await user.save();
  let token = jwt.sign(
    { _id: user._id, name: user.name, role: user.role },
    config.get("jwtPrivateKey")
  );
  let datatoRetuen = {
    name: user.name,
    role: user.role,
    email: user.email,
    token: user.token,
  };
  return res.send(datatoRetuen);
});

//Login
router.post("/login", async (req, res) => {
  let { error } = validateUserLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User Not Registered");
  let isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(401).send("Invalid Password");
  let token = jwt.sign(
    { _id: user._id, name: user.name, role: user.role },
    config.get("jwtPrivateKey")
  );
  res.send(token);
});

//get single products
router.get("/:id", async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user)
      return res.status(400).send("Product With given ID is not present"); //when id is not present id db
    return res.send(user); //everything is ok
  } catch (err) {
    return res.status(400).send("Invalid ID"); // format of id is not correct
  }
});

//Get records
router.get("/", async (req, res) => {
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  let user = await User.find().skip(skipRecords).limit(perPage);
  let total = await User.countDocuments();
  return res.send({ total, user });
});

//Delete a record
router.delete("/:id", async (req, res) => {
  let user = await User.findByIdAndDelete(req.params.id);
  return res.send(user);
});

//update a record
router.put("/:id", async (req, res) => {
  let user = await User.findById(req.params.id);
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  // await user.generateHashedPassword();
  // let token = jwt.sign(
  //   { _id: user._id, name: user.name, role: user.role },
  //   config.get("jwtPrivateKey")
  // );
  // let datatoRetuen = {
  //   name: user.name,
  //   role: user.role,
  //   email: user.email,
  //   token: user.token,
  // };
  // return res.send(datatoRetuen);
  await user.save();
  return res.send(user);
});

module.exports = router;
