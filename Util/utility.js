var randomstring = require("randomstring");


exports.generateStoreCode = () => {
    return randomstring.generate({
        length: 5,
        charset: 'alphabetic',
        capitalization : 'uppercase'
    });
}

exports.dateFormat = () =>{
    return new Date(Date.now()).toLocaleString();
}