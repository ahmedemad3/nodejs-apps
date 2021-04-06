// setup server
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var noteRoute = require('./route/noteRoute');
var storeRoute = require('./route/store.route');
var bookRoute = require('./route/book.route');
var userRoute = require('./route/user.route');
var loginRoute = require('./route/login.route');
var uploadRoute = require('./route/upload.route');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

var app = express();

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get("/" , function(req , res) {
    res.send("Server started ........");
});

app.use("/api/v1" , noteRoute);
app.use("/api/v1" , storeRoute);
app.use("/api/v1" , bookRoute);
app.use("/api/v1" , userRoute);
app.use("/api/v1" , loginRoute);
app.use("/api/v1" , uploadRoute);


app.listen(4000, () => {
    console.log(`Server start ....... `)
})

module.exports = app