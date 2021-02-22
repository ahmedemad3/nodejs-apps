exports.Note = class Note {

    constructor(noteId , title , content , createdBy , createdOn){
        this.noteId = noteId;
        this.title = title;
        this.content = content;
        this.createdBy = createdBy;
        this.createdOn = createdOn;
    }
}