// This function takes board and show's in pattern
const chalk = require('chalk');
exports.showBoards = (board) => {
    console.log(chalk.yellow('------------------\n'));
     board.forEach((val,index) =>{
        process.stdout.write(chalk.greenBright(val+'\t'));
        if((index+1) % 3 === 0){
            console.log('\n');
        }
    })
         console.log(chalk.yellow('------------------'));
}

