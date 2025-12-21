import { users } from "../utils/db.js";
import bcrypt from "bcrypt";


// Create user model
export async function createUser(firstname, lastname, email, password) {
  // check if email exists
  const existing = await users.findOne({ email });
  if (existing) {
    const err = new Error("Email already registered, please login");
    err.status = 400;
    throw err;
  }

  // hashing password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Inserting into the database
  const response = await users.insertOne({
    firstname,
    lastname,
    email,
    password: hashedPassword,
    createdAt: new Date(),
  });
  return response.insertedId;
}

// Find user model
export async function findUserByEmail(email) {
  const foundUser = await users.findOne({ email: email });
  return foundUser;
}
