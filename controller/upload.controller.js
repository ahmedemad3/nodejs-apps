var util = require('../Util/utility');
var validationUtil = require('../Util/validation');
var Logger = require('../services/logger.service');
var multer  = require('multer');
const logger = new Logger('upload.controller');

exports.uploadFile = async (req , res) => {
    var auditOn = util.dateFormat();
    try {
        var upload = multer({ dest: process.env.UPLOAD_PATH }).single('photo');
        upload(req , res , next => {

           try {
              var path= req.file.path;
              var file =req.file;
              console.log("Path : " + path);
              console.log("file : " + JSON.stringify(file));
              // save file in directory 
              // save meta dat in data base [file name (rename) , size , mimiType , path]
              return res.status(200).send({data : 'file is uploaded Successfully '});
           } catch (e) {
                throw e;
           }

        });
         
    } catch (err) {
        console.log("Error : " + err);
        return res.status(500).send({error : 'Failed to upload file'});
    }   
 }