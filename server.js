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
var exportRoute = require('./route/export.route');
var paypalRoute = require('./route/paypal.route');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

var app = express();
const { Server } = require("socket.io");


app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Expose the node_modules folder as static resources (to access socket.io.js in the browser)
app.use('/static', express.static('node_modules'));

app.get("/" , function(req , res) {
    // res.send("Server started ........");
    res.sendFile(__dirname + '/index.html')
});

app.get("/payment" , function(req , res) {
    // res.send("Server started ........");
    res.sendFile(__dirname + '/payment.html')
});

// success page 
app.get('/success' , (req ,res ) => { 
    res.sendFile(__dirname + '/success.html')
})
// error page 
app.get('/err' , (req , res) => {
    res.sendFile(__dirname + '/error.html')
})

app.use("/api/v1" , noteRoute);
app.use("/api/v1" , storeRoute);
app.use("/api/v1" , bookRoute);
app.use("/api/v1" , userRoute);
app.use("/api/v1" , loginRoute);
app.use("/api/v1" , uploadRoute);
app.use("/api/v1" , exportRoute);
app.use("/api/v1" , paypalRoute);



const server= app.listen(4000, () => {
    console.log(`Server start ....... `)
})

// initialize & listen to server
const io = new Server(server);
// Handle connection
io.on('connection', function (socket) {
    console.log("Connected successfully to the socket ...");
    
    setInterval(function(){
        var news = getNews();
        // Send news on the socket
        socket.emit('news', news);
    } , 5000);
    

    socket.on('my other event', function (data) {
        console.log(data);
    });
});

function getNews(){
    var length = Math.floor(Math.random() * 21);
    var news = [];
    for(var i = 0; i < length ; i++ ){
        var val = {id : i , title : 'The cure of the Sadness is to play Videogames' + i , date: new Date() }
        news.push(val);
    }
    return news
}





module.exports = app