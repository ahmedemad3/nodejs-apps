var generator = require('../Util/generator');
var memStorage = require('../Util/memory.storage');
var model = require('../model/note.model');


exports.getAllNotes = (req , res) => {
    // var seqId   = generator.generate();
    // memStorage.store.setItem(seqId , "1st_key");
    // var seqId_2   = generator.generate();
    // memStorage.store.setItem(seqId_2 , "2nd_key");

    // var keys = memStorage.getKeys(memStorage.store);
    var values = memStorage.getValues(memStorage.store);
    console.log("Values ....... " + JSON.stringify(values));
    return res.status(200).send(JSON.stringify(values));
}

exports.saveNote = (req , res) => {
    var seqId   = generator.generate();
    var createdBy = "admin";
    var createdOn = new Date();
    // req.body
    var title = req.body.title;
    var content = req.body.content;
    if(!title || !content){
        return res.status(500).send({ error: 'Title and Content should not be empty' })
    }
    
    var Note = model.Note;
    var noteObj = new Note(seqId , title , content , createdBy , createdOn);
    memStorage.store.setItem(seqId , noteObj);
    return res.status(201).send("Successfully note saved ");
}


exports.updateNote = (req , res) => {

    var createdBy = "admin";
    var createdOn = new Date();
    // req.body
    var noteId = req.body.noteId;
    var title = req.body.title;
    var content = req.body.content;
    if(!noteId){
        return res.status(500).send({ error: 'noteId should not be empty' })
    }
    if(!title || !content){
        return res.status(500).send({ error: 'Title and Content should not be empty' })
    }

    var noteItem = memStorage.store.getItem(noteId);
    if(!noteItem){
        return res.status(500).send({ error: 'noteId is not exist' })
    }
    
    var Note = model.Note;
    var noteObj = new Note(noteId , title , content , createdBy , createdOn);
    memStorage.store.setItem(noteId , noteObj);
    return res.status(200).send("Successfully note updated ");
}


exports.deleteNote = (req , res) => {
    var noteId = req.params.noteId;

    // validate not empty
    if(!noteId){
        return res.status(500).send({ error: 'can not delete empty noteId' })
    }

    // validate is already exists
    var noteItem = memStorage.store.getItem(noteId);
    if(!noteItem){
        return res.status(500).send({ error: 'noteId is not exist' })
    }

    // is exits
    memStorage.store.removeItem(noteId);
    return res.status(200).send("Successfully note deleted ");
}



