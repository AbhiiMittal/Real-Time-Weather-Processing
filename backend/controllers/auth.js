const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const cityModel = require("../models/cityModel");
const jwt = require("jsonwebtoken");

const cities = ["delhi","mumbai","bangalore","kolkata","chennai","hyderabad"];

const signUp = async (req, res) => {
    const userData = req.body;
  
    try {
      // Check if email is already registered
      const existingUser = await userModel.findOne({ email: userData.email });
      if (existingUser) {
        return res.status(400).json({ message: "Email is already registered" });
      }
  
      // Generate salt
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Error generating salt" });
        }
  
        // Hash password with generated salt
        bcrypt.hash(userData.password, salt, async (err, hpass) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ message: "Error hashing password" });
          }
  
          userData.password = hpass;
  
          try {
            // Create a new user document
            const user = await userModel.create(userData);
            console.log(user._id)
            cities.forEach(async(city) => {
              await cityModel.updateOne(
                { name: city },
                { $addToSet: { userIds: user._id } },
                { upsert: true }
              );
            });
            return res.status(201).json({ message: "User Created" });
          } catch (error) {
            if (error.name === "ValidationError") {
              // const errors = Object.values(error.errors).map(err => err.message);
              // console.log(error.message);
              return res.status(400).json(error);
            } else {
              console.log(error);
              return res.status(500).json({ message: "Error creating user" });
            }
          }
        });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  const signIn = async (req, res) => {
    const userCred = req.body;
    const data = await userModel.findOne({ email: userCred.email });
    if (data) {
      bcrypt.compare(userCred.password, data.password, (err, success) => {
        if (success === true) {
            const token = jwt.sign({ userid: data._id }, process.env.JWT_SECRET,{ expiresIn: "1h" });
              res.send({
                message: "Logged in Successfully",
                userId: data._id,
                name: data.name,
                token : token
              });
        } else {
          res.status(500).send({ message: "Incorrect Password" });
        }
      });
    } else {
      res.send({ message: "Email Not found" });
    }
  }
module.exports = { signIn, signUp };