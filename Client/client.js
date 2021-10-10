const socket = require('socket.io-client')('http://localhost:5050'); // Attaching socket.io-client to localhost on port 5050
const gameInit = require('./gameInit');  
const gameController = require('./gameController');
const cmdInput = require('./cmdInput');
const showResult = require('./showResult');

gameInit(socket); // Initializing The game

gameController(socket) // Game controller

cmdInput(socket)       // This function takes inputs from players

showResult(socket)     // Showing the Results



