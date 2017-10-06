var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Client = require('node-rest-client').Client;
var httpClient = new Client();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });

    setInterval(() => {       
        console.log('its next interval');
        io.emit('vehicle counts', 'no vehicles');
    },5000)
});


http.listen(3000, function () {
    console.log('listening on *:3000');
});