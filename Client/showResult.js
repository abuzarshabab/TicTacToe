
// Handling The Results of Players
module.exports = function showResult (socket){
    socket.on('resign' , () =>{
    console.log('Opponent Resigned ');
    console.log('🏆🏆🥇  Hurray You Won   🥇🏆🏆');
})

socket.on('win',() => {
    console.log('🏆🏆🥇  Hurray You Won   🥇🏆🏆');
})

socket.on('draw',()=>{
    console.log(' 👍 Match Tied : Try Again 👍 ');
})

socket.on('loose',() => {
    console.log('😭😭 You Loose : Try again  😭😭 ');
})

} 