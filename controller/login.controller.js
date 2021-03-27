var queries = require('../db/queries');
var dbConnection = require('../db/connection');
var util = require('../Util/utility');
var validationUtil = require('../Util/validation');
var Logger = require('../services/logger.service');
var auditService = require('../audit/audit.service');
var auditAction = require('../audit/auditAction');
var APIError = require('../error/api.error');
var errorStatus = require('../error/error.status');
var errorType = require('../error/error.type');
var bcrypt = require('bcryptjs');
var jwtUtil = require('../Util/jwtUtil');

const logger = new Logger('login.controller');


exports.getUserProfile = async (req , res) => {
    var user = req.user;
    try {
         return res.status(200).send(JSON.stringify(user));
    } catch (err) {
        console.log("Error : " + err);
        let errorMessage = 'Failed to get user : ' + err;
        return res.status(500).send({error : 'Failed to get user'});
    }   
 }

 exports.signIn = async (req , res) => {
    try {
        const {username , password} = req.body;
        
        /** 
         *  1- validate is not empty
         *  2- get user by username
         *  3- Compare password
         *  4- get user roles  
         *  5- generate token
         */

         if(!username || !password){
            return res.status(500).send({ error: 'username , password are required , can not empty' })
         }

         var loginQuery = queries.queryList.LOGIN_QUERY;
         var result = await dbConnection.dbQuery(loginQuery , [username]);
         var dbResponse = result.rows[0];
         if(dbResponse == null){
            logger.info("user :  ["+username+"] not exists in db");
            return res.status(errorStatus.unauthorized).send({ error: 'Invalid username or password' });
         }

         var isPasswordValid = validationUtil.comparePassword(password , dbResponse.password);
         if(!isPasswordValid){
            logger.info("Invalid password");
            return res.status(errorStatus.unauthorized).send({ error: 'Invalid username or password' });
         }

         var userRoles = await this.getUserRoles(dbResponse.user_id , req , res);
         console.log("userRoles : " + JSON.stringify(userRoles));
         var token = jwtUtil.generateToken(dbResponse.user_id , dbResponse.username , dbResponse.email , dbResponse.FULL_NAME , userRoles , dbResponse.user_type_code);
         return res.status(200).send(JSON.stringify(token));
    } catch (err) {
        logger.error("Failed to SignIn , Invalid username or password" + JSON.stringify(err))
        return res.status(500).send({error : 'Failed to SignIn , Invalid username or password'});
    }

 }


 exports.getUserRoles = async (userId) => {
    try {
        let roles = ["user"];
        return roles;
    } catch (err) {
    
    }

}


