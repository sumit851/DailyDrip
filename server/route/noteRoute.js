const router = require("express").Router();
const noteController = require("../controller/NoteController");

router.post("/add", noteController.createNote);
router.get("/", noteController.getAllNote);
router.get("/:id", noteController.getNotesById);
router.patch("/:id", noteController.updateNote);
router.delete("/:id", noteController.deleteNote);

module.exports = router;
