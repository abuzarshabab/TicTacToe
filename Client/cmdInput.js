
const chalk = require("chalk"); // importing Chalk

// For taking input from command Line
module.exports = function cmdInput(socket) {
  socket.on("input", () => {
    console.log(chalk.green("it's your turn "));
    const readline = require("readline").createInterface({
      input: process.stdin,
    });
    readline.question("", (name) => {
      socket.send(name);
    });
  });
};