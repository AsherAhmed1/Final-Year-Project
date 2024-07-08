import express from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const UserRouter = express.Router();

UserRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, email, phone, password, rPassword } = req.body;
  const userFinding = await UserModel.findOne({ email: email }); // Note: Use await here
  if (userFinding) {
    return res.json({ message: "User Already Registered" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new UserModel({
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    password: hashedPassword,
    rPassword: hashedPassword
  });

  await newUser.save();
  return res.json({ status: true, message: "Successfully Registered" });

});

UserRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const userFinding = await UserModel.findOne({ email: email });
    if (!userFinding){
        return res.json({ status: true, message: "User does not exist" });
    }

    const validPassword = await bcrypt.compare(password, userFinding.password);
    if (!validPassword) {
        return res.json({ status: true, message: "Invalid Password" });
    }

    const token = jwt.sign({ id: userFinding._id }, process.env.KEY, {expiresIn: "1h"});
    res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
    return res.json({ status: true, message: "Successfully Logged In" });
});

export default UserRouter;
