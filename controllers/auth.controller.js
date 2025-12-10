import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../models/user.js";
import bcrypt from "bcrypt";

// Handler to create a new user
export const newUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    // validating requset body
    if (!firstname || !lastname || !email || !password) {
      return res
        .status(400)
        .send({ message: "Name, email and password are required." });
    }

    // creating new user
    const newUser = await createUser(firstname, lastname, email, password);
    if (newUser) {
      res.status(201).send({
        message: `Welcome aboard ${firstname}, your account has been successfully created.`,
        userId: newUser,
      });
    } else {
      res
        .status(400)
        .send({ message: "User account creation failed, please try again" });
    }
  } catch (error) {
    if (error.status === 400) {
      return res.status(400).send({ message: error.message });
    }

    res
      .status(500)
      .send({ message: "Error creating user", error: error.message });
  }
};

// Default Handler
export const defaultHandler = (res, req) => {
  res.send("Server is live and running");
};

// Handler to login a user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);

    // check if user exists
    if (!user) {
      res
        .status(404)
        .send({ message: `User with ${email} not found, please register` });
    }

    // compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    // generating jwt token
    const token = jwt.sign(
      { id: user._id, email: user.email }, // payload
      process.env.JWT_SECRET, // jwt secret from the env file
      { expiresIn: "1h" } // token expiry time
    );

    // giving successful response
    res.status(200).send({
      message: `Login Successful, welcome back ${user.firstname}.`,
      token,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

// Handler to get current User
export const currentUser = async (req, res) => {
  const { email } = req.user;
  try {
    const user = await findUserByEmail(email);

    if (user) {
      res.status(200).send({
        message: `Welcome back ${user.firstname}, your email is ${user.email}`,
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error fetching user data", error });
  }
};
