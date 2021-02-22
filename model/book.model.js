exports.Book = class Book {

    constructor(bookId , title , isbn , description , publisher , author , pages){
        this.bookId = bookId;
        this.title = title;
        this.isbn = isbn;
        this.description = description;
        this.publisher = publisher;
        this.author = author;
        this.pages = pages;
    }
}