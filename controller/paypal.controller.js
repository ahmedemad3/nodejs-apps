var paypalService = require('../services/paypal.service');


exports.createPayment = (req , res) => {

    // create payment object 
    var payment = {
        "intent": "authorize",
        "payer": {
            "payment_method": "paypal"
        }, 
        "redirect_urls": {
            "return_url": "http://127.0.0.1:4000/success",
            "cancel_url": "http://127.0.0.1:4000/err"
        },
        "transactions": [{
            "amount": {
                "total": 39.00,
                "currency": "USD"
            },
            "description": " a book on mean stack "
        }]
    }

    paypalService.createPaypalPayment(payment).then((transaction)=>{
        console.log("Create Payment Response");
        console.log("transaction : " + JSON.stringify(transaction));
        var transactionId = transaction.id; 
        console.log("id : " + transactionId);
        // NEED TO LOG ALL TRANSACTION FOR EACH REQUEST AND RESPONSE FOR AUDITING
        // generate transaction reference number tx_randomnumber
        // transaction status [Success , failed , cancelled , pending]
        res.redirect("/success")
    })
   .catch((err)=>{
        console.log( err ); 
        res.redirect("/err")
        throw error;
   })
}