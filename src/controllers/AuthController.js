const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");

const User = require("../models/User");

const generateJwtToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

module.exports.signup = (req, res) => {
    try{
      User.findOne({ email: req.body.email }).exec(async (error, user) => {
        if (user)
        return res.status(400).json({
          error: "User already registered",
        });

        const { firstName, lastName, email, password, mobile } = req.body;
        const hash_password = await bcrypt.hash(password, 10);
        const _user = new User({
          firstName,
          lastName,
          email,
          mobile,
          password: hash_password,
          userName: shortid.generate(),
        });
        
        _user.save((error, user) => {
          if (error) {
            return res.status(400).json({
              message: error,
            });
          }

          if (user) {
            const token = generateJwtToken(user._id, user.role);
            const { _id, firstName, lastName, email, role, fullName } = user;
            return res.status(201).json({
              token,
              user: { _id, firstName, lastName, email, role, fullName },
            });
          }
        });
      });
    }catch (err){
      return res.status(400).json({
        message: "Something went wrong",
      });
    }
};

module.exports.login = (req, res) => {
  try{
    User.findOne({ email: req.body.email }).exec(async (error, user) => {
      if (error) return res.status(400).json({ error });
      if (user) {
        const isPassword = await user.authenticate(req.body.password);
        if (isPassword && user.role === "user") {
          // const token = jwt.sign(
          //   { _id: user._id, role: user.role },
          //   process.env.JWT_SECRET,
          //   { expiresIn: "1d" }
          // );
          const token = generateJwtToken(user._id, user.role);
          const { _id, firstName, lastName, email, role, fullName, mobile } = user;
          res.status(200).json({
            token,
            user: { _id, firstName, lastName, email, role, fullName, mobile },
          });
        } else {
          return res.status(400).json({
            message: "Invalid Email or Password",
          });
        }
      } else {
        return res.status(400).json({ message: "Invalid Email or Password!!" });
      }
    });
  }catch (err){
    return res.status(400).json({ message: "Something went wrong!!" });
  }
};

