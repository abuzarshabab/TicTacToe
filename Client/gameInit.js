const { showBoards } = require("./showBoard");
const chalk = require('chalk');                     // importing Chalk                


module.exports = function gameInit(socket) {
    //When server emits Disconnect event
    socket.on('disconnect' , () =>{
    console.log('Server is disconnect');
    })      
   
    socket.on('info' , (msg) =>{
        console.log(chalk.green(msg));
    });

    socket.on('playerAssign' , (count) =>{
        console.log(`Your are ${ count === 1 ? 'first player and You got : " X "'  : 'second  player and You got : " O "'} `);
    })


    socket.on('showBoard',(board)=>{
    showBoards(board);
    })
}
