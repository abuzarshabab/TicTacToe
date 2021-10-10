
const chalk = require('chalk');                                      // importing Chalk      


module.exports = function cmdInput (socket){
    
// For taking input from command Line
    socket.on('input',()=>{
        console.log(chalk.green('it\'s your turn '));
        const readline = require('readline').createInterface({
        input: process.stdin
        })
        readline.question("", name => {
        socket.send(name);
        })
    })
}