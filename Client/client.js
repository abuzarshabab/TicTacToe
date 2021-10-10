const process = require("process");
const socket = require("socket.io-client")(
  `http://${process.argv[2]}:${process.argv[3]}`
); // Attaching socket.io-client to

const gameInit = require("./gameInit");
const gameController = require("./gameController");
const cmdInput = require("./cmdInput");
const showResult = require("./showResult");

gameInit(socket); // Initializing The game

gameController(socket); // Game controller

cmdInput(socket); // This function takes inputs from players

showResult(socket); // Showing the Results
