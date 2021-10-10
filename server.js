const { emit } = require('process');

const server = require('http').createServer();
const io = require('socket.io')(server);
const PORT = 5050;

let counter= 1;
let board = [1,2,3,4,5,6,7,8,9];

function isWin(player,symbol,currentBoard) {
    
const winningResultSet = [
		[0,1,2],
		[3,4,5],
		[6,7,8],
		[0,4,8],
		[2,4,6],
		[0,3,6],
		[1,4,7],
		[2,5,8]
		];
        let winStatus = 0;
        winningResultSet.forEach((set) =>{
            let winCounter = 0;
            set.forEach((item) =>{
               if( currentBoard[item] === symbol){
                    winCounter++;
               }
            })
            if(winCounter === 3){
               winStatus = 1;
               return;
            }
        })
        if(winStatus === 1){
            return player;
        }
}

console.log(board);


io.on('connection', (socket)=>{

    console.log(`Player ${counter} is connected`);

     socket.emit('info',(`Connected to 127.0.0.1 ${PORT}`));

     socket.emit('input');


     if(counter == 2){
        // If Two Players gets connected Then show board event will be emmited
        socket.emit('playerAssign' ,(counter));
        io.sockets.emit('showBoard',(board));

        p2 = socket.id;
        counter=1;

    }else{
        socket.emit('playerAssign' ,(counter));
        p1= socket.id;
        counter++;
    }

    socket.on('message', (evt) => {   

        let winner = 0;
        
        if(p1 === socket.id){
            board[evt-1] = "X" ;
            winner = isWin(socket.id , "X" , board) 

        }else if(p2 === socket.id){
            board[evt-1] = "O" ;
            winner = isWin(socket.id , "O" , board)
        }else{
            socket.emit('message', 'your are not permitted in GAME')
        }

        if(winner){
            io.sockets.emit('showBoard',board);
            socket.emit ('win');
            socket.broadcast.emit('loose');
        }else{
            io.sockets.emit('showBoard',board);
            socket.emit('input');
            socket.broadcast.emit('move', `Opponent Move Position : ${evt}`);
        }
       
    })

})


io.on('disconnect',(disc)=>{
    socket.broadcast.emit('disconnect');
    console.log(`Player is disconnected`);

})

server.listen(PORT , () => {
    console.log(`Server is listening on localhost : ${PORT}`);
})







// p1 = id 
// p2 = id

// if(p[0] sends val) =>{
//     board[val-1] <= p[0]
// }