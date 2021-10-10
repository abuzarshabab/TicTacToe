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
socket.on('move' ,(data) =>{
    console.log(chalk.redBright( data));
    console.log(chalk.green('it\'s your turn'));
})

socket.on('win',() => {
    console.log('🏆🏆🥇  Hurray You Won   🥇🏆🏆');
})

socket.on('loose',() => {
    console.log('😭😭 You Loose : Try again  😭😭 ');
})


socket.on('input',()=>{
    const readline = require('readline').createInterface({
    input: process.stdin
    })

    readline.question("", name => {
    socket.send(name);
    })
})

socket.on('playerAssign' , (count) =>{
    console.log(`Your are ${ count === 1 ? 'first' : 'second'} player`);
})

// This function take tic tac toe element and show in pattern
function showBoard(board) {
    console.log(chalk.yellow('------------------\n'));
     board.forEach((val,index) =>{
        process.stdout.write(chalk.greenBright(val+'\t'));
        if((index+1) % 3 === 0){
            console.log('\n');
        }
    })
         console.log(chalk.yellow('------------------'));
}