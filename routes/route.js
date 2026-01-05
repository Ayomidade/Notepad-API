import { Router } from "express";
import {
  currentUser,
  defaultHandler,
  loginUser,
  newUser,
} from "../controllers/auth.controller.js";
import { rateLimiter } from "../middlewares/rate_limiter.js";
import auth from "../middlewares/auth.js";
import {
  createNoteHandler,
  deleteNoteHandler,
  getNotesHandler,
  getSingleNoteHandler,
  searchNotes,
  updateNoteHandler,
} from "../controllers/note.controller.js"; 

export const router = Router();
router.get("/root", defaultHandler);
router.post("/new-user", newUser); //API to create new user(working)
router.post("/login", rateLimiter, loginUser); //API to login user (working)
router.get("/user", auth, currentUser);
router.post("/notes", auth, createNoteHandler); // API to create a new note (working)
router.get("/notes", auth, getNotesHandler); // API to get all notes of a user (working)
router.get("/notes/search", auth, searchNotes); // Search note
router.delete("/notes/:id", auth, deleteNoteHandler); //API to delete a single note with the notedId and userId
router.get("/notes/:id", auth, getSingleNoteHandler); //API to get a single note with the noteId and userId
router.patch("/notes/:id", auth, updateNoteHandler); //API endpoint for editing a note

// export default router;
