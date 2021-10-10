const server = require('http').createServer();
const io = require('socket.io')(server);
const PORT = 5050;
var counter= 1;
const players = ['X','O'];
var board = [1,2,3,4,5,6,7,8,9];

io.on('connection', (socket)=>{

    console.log(`Player ${counter} is connected`);

     socket.emit('info',(`Connected to 127.0.0.1 ${PORT}`));

     socket.emit('input');

     if(counter == 2){
        // If Two Players gets connected Then show board event will be emmited
        io.sockets.emit('showBoard',(board));
        p2 = socket.id;
        counter=1;

    }else{
        p1= socket.id;
        counter++;
    }

    socket.on('message', (evt) => {   
            socket.emit('input');
            socket.broadcast.emit('message', evt)
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