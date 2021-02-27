exports.Audit = class Audit {

    constructor(auditAction , data , status , error , auditBy , auditOn){
        this.auditAction = auditAction;
        this.data = data;
        this.status = status;
        this.error = error;
        this.auditBy = auditBy;
        this.auditOn = auditOn;
    }
}