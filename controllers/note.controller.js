import { createNote, getUserNotes } from "../models/note.model.js";
import { findUserByEmail } from "../models/user.js";

// Handler to create a new note
export const createNoteHandler = async (req, res) => {
  const { title, content } = req.body;
  if (!req.user || !req.user.id) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  const userId = req.user.id;
  try {
    if (!title || !content) {
      return res
        .status(400)
        .send({ message: "Title and content are required." });
    }
    const noteId = await createNote(title, content, userId);
    res.status(201).send({ message: "Note successfully created", noteId });
  } catch (error) {
    console.log("Error creating note:", error);
    res.status(500).send({ message: "Error creating note" });
  }
};

// Handler to get all notes of a user
export const getNotesHandler = async (req, res) => {
  const { email } = req.user;
  try {
    const user = await findUserByEmail(email);

    if (user) {
      const userNotes = await getUserNotes(user._id);
      res
        .status(200)
        .send({ message: "Notes retrieved successfully", notes: userNotes });
    } else {
      res.status(404).send({ message: "User not found, please login again" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

// Handler to delete a note
export const deleteNoteHandler = async (req, res) => {
  console.log(req.params)
};
