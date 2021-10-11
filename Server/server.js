const server = require('http').createServer();
const io = require('socket.io')(server);
const process = require("process");

const isWin = require("./isWin");
const PORT = process.argv[2];

let counter = 1;
let board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let movesCounter = 0;
io.on("connection", (socket) => {
  console.log(`Player ${counter} is connected`);
  socket.emit("info", `Connected to 127.0.0.1 ${PORT}`);

  if (counter == 2) {
    // If Two Players gets connected Then show board event will be Emitted else only emit player info
    socket.emit("playerAssign", counter);
    io.sockets.emit("showBoard", board);
    socket.broadcast.emit("input");
    socket.emit("opponentTurn");
    p2 = socket.id;
    counter = 1;
  } else {
    socket.emit("playerAssign", counter);
    p1 = socket.id;
    counter++;
  }

  socket.on("message", (evt) => {
    let winner = 0;
    if (evt === "r") {
      socket.broadcast.emit("resign");
      socket.emit("loose");
    } else {
      // Evaluating the Player Winning
      if (p1 === socket.id) {
        movesCounter++;
        board[evt - 1] = "X";
        winner = isWin(socket.id, "X", board);
      } else if (p2 === socket.id) {
        movesCounter++;
        board[evt - 1] = "O";
        winner = isWin(socket.id, "O", board);
      } else {
        socket.emit("message", "your are not permitted in GAME");
      }

      // Checking The winner Player and emitting The Respective Event
      if (winner && movesCounter <= 9) {
        io.sockets.emit("showBoard", board);
        socket.emit("win");
        socket.broadcast.emit("loose");
        board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      } else if (movesCounter >= 9) {
        io.sockets.emit("showBoard", board);
        io.sockets.emit("draw");
        board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      } else {
        io.sockets.emit("showBoard", board);
        socket.broadcast.emit("move", `Opponent Move Position : ${evt}`);
        socket.broadcast.emit("input");
        socket.emit("opponentTurn");
      }
    }
  });
});

// if server crashes or interrupted Then broadcasting the disconnect message
io.on("disconnect", (disc) => {
  io.sockets.emit("disconnect");
});

// Listening
server.listen(PORT, () => {
  console.log(`Server is listening on localhost : ${PORT}`);
});






