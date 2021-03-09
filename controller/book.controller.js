var queries = require('../db/queries');
var dbConnection = require('../db/connection');
var util = require('../Util/utility');
var Logger = require('../services/logger.service');
var auditService = require('../audit/audit.service');
var auditAction = require('../audit/auditAction');
var APIError = require('../error/api.error');
var errorStatus = require('../error/error.status');
var errorType = require('../error/error.type');

const logger = new Logger('book.controller');

exports.getBookList = async (req , res) => {
    var auditOn = util.dateFormat();
    try {
         var bookListQuery = queries.queryList.GET_BOOK_LIST_QUERY;
         var result = await dbConnection.dbQuery(bookListQuery);
         logger.info("return Book List" , result.rows);
         auditService.prepareAudit(auditAction.actionList.GET_BOOK_LIST , result.rows , null , "postman" , auditOn);
         return res.status(200).send(JSON.stringify(result.rows));
    } catch (err) {
        console.log("Error : " + err);
        let errorMessage = 'Failed to get books' + err;
        auditService.prepareAudit(auditAction.actionList.GET_BOOK_LIST , null , JSON.stringify(errorMessage) , "postman" , auditOn);
        return res.status(500).send({error : 'Failed to get books'});
    }   
 }

 exports.getBookDetails = async (req , res) => {
    try {
         var bookId = req.params.bookId;
         console.log("bookId : " + bookId);
         if (isNaN(bookId))
            throw new APIError(errorType.API_ERROR , 
            errorStatus.INTERNAL_SERVER_ERROR ,
             "Invalid bookId , is not a number , bookId value is : " + bookId , 
             true);
        
        var bookDetailsQuery = queries.queryList.GET_BOOK_DETAILS_QUERY;
        var result = await dbConnection.dbQuery(bookDetailsQuery , [bookId]);
        return res.status(200).send(JSON.stringify(result.rows[0]));
    } catch (err) {
        console.log("Error : " + err.description);
        if(err.name === errorType.SQL_INJECTION_ERROR)
            // handlerError();
        logger.error("Failed to get Book details " , JSON.stringify(err));
        return res.status(500).send({error : 'Failed to get book details'});
    }   
 }


 exports.saveBook = async (req , res) => {

    try {
    
        var createdBy = "admin";
        var createdOn = new Date();
        // req.body
        var title = req.body.title;
        var description = req.body.description;
        var author = req.body.author;
        var publisher = req.body.publisher;
        var pages = req.body.pages;
        var storeCode = req.body.storeCode;

        // console.log("storeName : " + storeName   + " ----- address : " + address)
        if(!title || !author || !publisher || !storeCode){
            return res.status(500).send({ error: 'title , author , publisher , storeCode are required , can not empty' })
        }
        
        values =[title , description , author , publisher , pages , storeCode,  createdBy , createdOn];
        var saveBookQuery = queries.queryList.SAVE_BOOK_QUERY;
        await dbConnection.dbQuery(saveBookQuery , values);
        return res.status(201).send("Successfully adding new book ");
    } catch (err) {
        console.log("Error : " + err);
        return res.status(500).send({error : 'Failed to add new book'});
    }
}

exports.updateBook = async (req , res) => {

    try {
    
        var createdBy = "admin";
        var createdOn = new Date();
        // req.body
        var bookId=req.body.bookId;
        var title = req.body.title;
        var description = req.body.description;
        var author = req.body.author;
        var publisher = req.body.publisher;
        var pages = req.body.pages;
        var storeCode = req.body.storeCode;

        if(!bookId || !title || !author || !publisher || !storeCode){
            return res.status(500).send({ error: 'bookId , title , author , publisher , storeCode are required , can not empty' })
        }
        
        values =[title , description , author , publisher , pages , storeCode,  createdBy , createdOn , bookId];
        var updateBookQuery = queries.queryList.UPDATE_BOOK_QUERY;
        await dbConnection.dbQuery(updateBookQuery , values);
        return res.status(200).send("Successfully update book title :" + title);
    } catch (err) {
        console.log("Error : " + err);
        return res.status(500).send({error : 'Failed to update book title : '+ title});
    }
}

exports.deleteBook = async (req , res) => {
    var bookId = req.params.bookId;

    try {
      // validate not empty
      if(!bookId){
        return res.status(500).send({ error: 'can not delete empty bookId' })
        }

        var deleteBookQuery = queries.queryList.DELETE_BOOK_QUERY;
        await dbConnection.dbQuery(deleteBookQuery , [bookId]);

        return res.status(200).send("Successfully book deleted ");
    } catch (err) {
        console.log("Error : " + err);
        return res.status(500).send({error : 'Failed to delete book with id : '+ bookId});
    }

  

    

   
   
}