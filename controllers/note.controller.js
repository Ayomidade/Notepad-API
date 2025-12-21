import {
  createNote,
  deleteNote,
  findNote,
  getUserNotes,
  updateNote,
} from "../models/note.model.js";
import { findUserByEmail } from "../models/user.js";

// Handler to create a new note
export const createNoteHandler = async (req, res) => {
  const { title, content } = req.body;
  const { email } = req.user;

  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  const userId = user._id;

  try {
    if (!title || !content) {
      return res
        .status(400)
        .send({ message: "Title and content are required." });
    }
    const noteId = await createNote(title, content, userId, email);
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

    const userId = user._id;

    if (user) {
      const userNotes = await getUserNotes(user.email, userId);
      // if (userNotes == []) {
      //   return res.status(404).send({ message: "No note found" });
      // }
      res
        .status(200)
        .send({ message: "Notes retrieved successfully", notes: userNotes });
    } else {
      res.status(401).send({ message: "Unauthorized" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

// Handler to delete a note
export const deleteNoteHandler = async (req, res) => {
  const { id } = req.params;
  const { email } = req.user;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).send({ message: "Unauthorized, please sign in" });
    }

    const deletedNote = await deleteNote(user._id, id);
    if (deletedNote.deletedCount === 0) {
      return res.status(404).send({
        message:
          "Note not found.",
      });
    }

    res.status(200).send({ message: "Note deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

// Handler to get a secific note
export const getSingleNoteHandler = async (req, res) => {
  const { id } = req.params;
  const { email } = req.user;

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res
        .status(401)
        .send({ message: "Unauthorized, please login again" });
    }

    const note = await findNote(id, user._id);
    if (!note) {
      return res.status(404).send({ message: "Note not found" });
    }

    res.status(200).send({ message: "Note retrieved successfully", note });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

// Handler to update a specific note
export const updateNoteHandler = async (req, res) => {
  const { id } = req.params;
  const { email } = req.user;
  const { title, content } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).send({ message: "Unauthorized, please sign-up" });
    }

    const note = await findNote(id, user._id);
    if (!note) {
      return res.status(404).send({ message: "Note not found" });
    }

    const update = {};
    if (title) update.title = title;
    if (content) update.content = content;

    if (Object.keys(update).length === 0) {
      return res.status(400).send({ message: "Enter a field to update" });
    }

    const updatedNote = await updateNote(id, req.user.id, update);
    if (updatedNote.matchedCount === 0) {
      res.status(404).send({ message: "Access denied" });
    }

    res.status(200).send({ message: "Note updated successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};
