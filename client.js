const socket = require('socket.io-client')('http://localhost:5050');
const repl = require ('repl');
const chalk = require('chalk');


socket.on('disconnect' , () =>{
  cons('disconnect');
})

socket.on('info' , (msg) =>{
    console.log(chalk.green(msg));
});

socket.on('showBoard',(board)=>{
   showBoard(board);
})
  
 
socket.on('message', (data) => {
      const cmd = data;
      console.log(chalk.green( cmd.split('\n')[0]));
  })

socket.on('input',()=>{
    const readline = require('readline').createInterface({
    input: process.stdin
    })

    readline.question(`What's your name?`, name => {
    socket.send(name);
    })


})


// This function take tic tac toe element and show in pattern
function showBoard(board) {
     board.forEach((val) =>{
        process.stdout.write(chalk.greenBright(val+'\t'));
        if(val % 3 === 0){
            console.log('\n');
        }
    })
}