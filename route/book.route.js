var express = require('express');
const router = express.Router();
var bookCtrl = require('../controller/book.controller');

router.get("/books" , bookCtrl.getBookList);
router.get("/books/details/:bookId" , bookCtrl.getBookDetails);
router.post("/books/save" , bookCtrl.saveBook);
router.put("/books/update" , bookCtrl.updateBook);
router.delete("/books/delete/:bookId" , bookCtrl.deleteBook);

module.exports = router