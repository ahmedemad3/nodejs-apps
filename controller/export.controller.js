var queries = require('../db/queries');
var dbConnection = require('../db/connection');
var util = require('../Util/utility');
var validationUtil = require('../Util/validation');
var Logger = require('../services/logger.service');
var auditService = require('../audit/audit.service');
var auditAction = require('../audit/auditAction');
var fastCsv = require('fast-csv');
var fs = require('fs');
const ws = fs.createWriteStream("books.csv");

const logger = new Logger('export.controller');

exports.exportBooks = async (req , res) => {
    try {
        var bookListQuery = queries.queryList.GET_BOOK_LIST_QUERY;
        var result = await dbConnection.dbQuery(bookListQuery);
        logger.info("return Book List" , result.rows);
        const data = JSON.parse(JSON.stringify(result.rows));
        fastCsv.write(data , {headers : true}).on("end", ()=>{
            console.log("write to books.csv successfully");
            res.download("books.csv" , function(){
                console.log("file downloaded successfully");
            })
        }).pipe(ws);
        // return res.status(200).send({data : "export data successfully"})
    } catch (err) {
        console.log("Error : " + err);
        return res.status(500).send({error : 'Failed to export books'});
    }   
 }