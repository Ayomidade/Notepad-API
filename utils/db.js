import { MongoClient } from "mongodb";
import { config } from "dotenv";
config();

const client = new MongoClient(process.env.MONGO_URI);

// let db = client.db("Note Taking App"); // create or use existing database
// let user = db.collection("users"); // create or use existing user collection
// let note = db.collection("notes"); // create or use existing note collection

let db;
let users;
let notes;

async function connectDB() {
  try {
    await client.connect(); // Establish Connection
    console.log("MongoDB connected");

    db = client.db("Notepad"); //Create or use existing Database
    users = db.collection("users"); //create or use existing user collection
    notes = db.collection("notes"); //Create or use existing note collection
  } catch (err) {
    console.log(
      "Unable to communicate with database, check internet connection and try again."
    );
  }
}

await connectDB();

export { users, notes };
