module.exports = function isWin(player,symbol,currentBoard) {

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