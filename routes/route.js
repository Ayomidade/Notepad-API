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
  updateNoteHandler,
} from "../controllers/note.controller.js";

export const router = Router();
router.get("/root", defaultHandler);
router.post("/new-user", newUser); //API to create new user(working)
router.post("/login", rateLimiter, loginUser); //API to login user (working)
router.post("/user", auth, currentUser);
router.post("/create-note", auth, createNoteHandler); // API to create a new note (working)
router.get("/notes", auth, getNotesHandler); // API to get all notes of a user (working)
router.delete("/clear-note/:id", auth, deleteNoteHandler); //API to delete a single note with the notedId and userId
router.get("/get-note/:id", auth, getSingleNoteHandler); //API to get a single note with the noteId and userId
router.patch("/update-note/:id", auth, updateNoteHandler);

// export default router;
