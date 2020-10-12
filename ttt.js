var xTurn = true;
var isGameOver = false;
var board = new Array(9);
var moves = document.getElementsByClassName("move");
var bot = 'O';

// create event listeners on each play position
for (var i = 0; i < moves.length; ++i){
    moves[i].addEventListener('click', playFromEvent);
}

resetGame();

function playFromEvent(e){
    if(isGameOver) return;
    if(e.target.innerHTML == ''){
        if(xTurn){
            e.target.innerHTML = 'X';
        }else{
            e.target.innerHTML = 'O';
        }
        xTurn = !xTurn;
        updateWinner();
    }
    generateMove();
}

function play(i){
    if(isGameOver) return false;
    if(moves[i].innerHTML == ''){
        if(xTurn){
            moves[i].innerHTML = 'X';
        }else{
            moves[i].innerHTML = 'O';
        }
        updateWinner();
        xTurn = !xTurn;
        return true;
    }
    return false;
}

function resetGame(){
    for(var i = 0; i < moves.length; ++i){
        moves[i].innerHTML = '';
    }
    isGameOver = false;
    document.getElementById("winner").innerHTML = '';
    generateMove();
}

function updateWinner(){
    var winner = getWinner();
    if(winner != ''){
        document.getElementById('winner').innerHTML = winner + ' WINS!';
        isGameOver = true;
    }
}

function getWinner(){
    var winner = '';
    
    // update board
    for(var i = 0; i < board.length; ++i){
        board[i] = moves[i].innerHTML;
    }
    
    if(board[0] != '' && board[0] == board[1] && board[1] == board[2]) winner = board[0];
    else if(board[3] != '' && board[3] == board[4] && board[4] == board[5]) winner = board[3];
    else if(board[6] != '' && board[6] == board[7] && board[7] == board[8]) winner = board[6];
    else if(board[0] != '' && board[0] == board[3] && board[3] == board[6]) winner = board[0];
    else if(board[1] != '' && board[1] == board[4] && board[4] == board[7]) winner = board[1];
    else if(board[2] != '' && board[2] == board[5] && board[5] == board[8]) winner = board[2];
    else if(board[0] != '' && board[0] == board[4] && board[4] == board[8]) winner = board[0];
    else if(board[2] != '' && board[2] == board[4] && board[4] == board[6]) winner = board[2];
    if(winner == '' && isBoardFull()){
        winner = 'CAT';
    }
    return winner;
}

function generateMove(){
    if((xTurn && bot == 'X') || (!xTurn && bot == 'O')){
        playWinningMove() || blockWinningMove() || playMiddle() || playRandom();
    }
}

function playWinningMove(){
    var currentPlayer = xTurn ? 'X' : 'O';
    for(var i = 0; i < moves.length; ++i){
        if(moves[i].innerHTML != '') continue;
        moves[i].innerHTML = currentPlayer;
        var winner = getWinner();
        moves[i].innerHTML = '';
        if(winner == currentPlayer){
            return play(i);
        }
    }
    return false;
}

function blockWinningMove(){
    var opponent = xTurn ? 'O' : 'X';
    for(var i = 0; i < moves.length; ++i){
        if(moves[i].innerHTML != '') continue;
        moves[i].innerHTML = opponent;
        var winner = getWinner();
        moves[i].innerHTML = '';
        if(winner == opponent){
            return play(i);
        }
    }
    return false;
}

function playMiddle(){
    return play(4);
}

function playRandom(){
    if(isBoardFull()) return false;
    var i;
    do{
        i = Math.floor(Math.random()*9);
    }while(moves[i].innerHTML != '');
    return play(i);
}

function isBoardFull(){
    for(var i = 0; i < moves.length; ++i){
        if(moves[i].innerHTML == '') return false;
    }
    return true;
}

function swapPlayer(){
    bot = bot == 'X' ? 'O' : 'X';
    var player = bot == 'X' ? 'O' : 'X';
    document.getElementById('player-swap').innerHTML = 'Player: ' + player;
    generateMove();
}