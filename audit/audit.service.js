var events = require('events');
var audit = require('../model/audit.model');
var queries = require('../db/queries');
var dbConnection = require('../db/connection');

var emitter = new events.EventEmitter();

const auditEvent = 'audit';
emitter.on(auditEvent , function(audit){
    // steps of actions - save into db
    console.log("Audit Event Emitter - Audit : " + JSON.stringify(audit));
    try {
        values =[audit.auditAction , JSON.stringify(audit.data) , audit.status , audit.error , audit.auditBy , audit.auditOn];
        var auditQuery = queries.queryList.AUDIT_QUERY;
        dbConnection.dbQuery(auditQuery , values);
        
    } catch (error) {
        console.log("Audit Event Emitter - error : " + error);
    }
   





});

exports.prepareAudit = function(auditAction , data , error , auditBy , auditOn){
    let status = 200;
    if(error)
        status = 500;
    
    var auditObj = new audit.Audit(auditAction , data , status , error , auditBy , auditOn)    
    emitter.emit(auditEvent , auditObj);
} 