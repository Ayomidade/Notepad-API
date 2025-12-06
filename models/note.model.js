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

export async function getUserNotes(userId) {
  const userNotes = await notes
    .find({ userId: new ObjectId(userId) })
    .toArray(); // ← Convert cursor to an array

  return userNotes;
}

export async function deleteNote(userId, noteId) {
  const result = await notes.deleteOne({
    _id: new ObjectId(noteId),
    userId: new ObjectId(userId),
  });

  return result;
}
