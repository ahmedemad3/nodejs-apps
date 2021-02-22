var express = require('express');
const router = express.Router();
var noteCtrl = require('../controller/noteController');

router.get("/notes" , noteCtrl.getAllNotes);
router.post("/notes/save" , noteCtrl.saveNote);
router.put("/notes/update" , noteCtrl.updateNote);
router.delete("/notes/delete/:noteId" , noteCtrl.deleteNote);


module.exports = router