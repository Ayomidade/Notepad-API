import { ObjectId } from "mongodb";
import { notes } from "../utils/db.js";

// Create a new note
export async function createNote(title, content, userId) {
  const { insertedId } = await notes.insertOne({
    userId: new ObjectId(userId),
    title,
    content,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return insertedId;
}

// Get all notes for a specific user
export async function getUserNotes( userId) {
  const userNotes = await notes
    .find({  userId: new ObjectId(userId) })
    .toArray(); // ← Convert cursor to an array

  return userNotes;
}

// Delete a note by ut ID and the user ID
export async function deleteNote(userId, noteId) {
  const result = await notes.deleteOne({
    _id: new ObjectId(noteId),
    userId: new ObjectId(userId),
  });

  return result;
}

// Find a note by its ID and user ID
export async function findNote(noteId, userId) {
  const note = await notes.findOne({
    _id: new ObjectId(noteId),
    userId: new ObjectId(userId),
  });

  return note;
}

// Updates a existing note
export async function updateNote(noteId, userId, update) {
  const result = await notes.updateOne(
    {
      _id: new ObjectId(noteId),
      userId: new ObjectId(userId),
    },
    {
      $set: {
        ...update,
        updatedAt: new Date(),
      },
    }
  );

  return result;
}
