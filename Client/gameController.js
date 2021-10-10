
const chalk = require('chalk');                     // importing Chalk   



module.exports = function gameController(socket) {
    socket.on('message', (data) => {
      const cmd = data;
      console.log(chalk.green( cmd.split('\n')[0]));
    })
    socket.on('move' ,(data) =>{

        console.log(chalk.redBright( data));
    
    })

    socket.on('opponentTurn' , ()=>{
        console.log(chalk.redBright('Wait for opponent Turn'));
    })

}