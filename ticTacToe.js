var player1Display = document.querySelector("#player1");
var player2Display = document.querySelector("#player2");
var tdDisplays = document.querySelectorAll("td");
var players= document.querySelectorAll(".player");
var scores= document.querySelectorAll(".score");
var resetBtn= document.querySelector("#reset");
var newGameBtn= document.querySelector("#newGame");
var activePlayer = 0;
var gameOver=0;

init();



function init(){
    
    clearScores();

    resetBtn.addEventListener("click",function(){
        reset();
    })

    newGameBtn.addEventListener("click",function(){
        reset();
        clearScores();
    })

    for (var i = 0; i < tdDisplays.length; i++) {
        tdDisplays[i].tableValue = 0;
        tdDisplays[i].addEventListener("click", function () {
            if(this.textContent=="" && gameOver==0){
                if (activePlayer === 0) {
                    this.textContent = "X";
                    this.tableValue = 1;
                    checkWin();
                } 
                else {
                    this.textContent = "O";
                    this.tableValue = -1;
                    checkWin();
                }
            }
        })
    }
}

function clearScores(){
    for(var i=0;i<scores.length;i++){
        scores[i].scoreValue=0;
        scores[i].textContent=scores[i].scoreValue;
    }
}

function reset(){
    for (var i = 0; i < tdDisplays.length; i++) {
        tdDisplays[i].textContent = "";
        tdDisplays[i].tableValue = 0;
        tdDisplays[i].classList.remove("win");
    }
    activePlayer = 0;
    gameOver=0;
    players[0].classList.add("activePlayer");
    players[1].classList.remove("activePlayer");
}


function checkWin(){
    if(horizontalWin()||verticalWin()||diag1Win()||diag2Win()){
        console.log("The winner is: player" + activePlayer);
        scores[activePlayer].scoreValue+=1;
        scores[activePlayer].textContent=scores[activePlayer].scoreValue;
        gameOver=1;
        //reset();     
    }
    else{
        activePlayer=1-activePlayer;
        for(var i=0;i<players.length;i++){
            players[i].classList.toggle("activePlayer");
        }
    }  

    function horizontalWin(){
        for (var y = 0; y < 9; y += 3) {
            sum = 0;
            for (var i = 0; i < 3; i++) {
                sum += tdDisplays[i + y].tableValue;
            }
            if(Math.abs(sum)===3){
                ////////////////////////
                for (var i = 0; i < 3; i++) {
                    tdDisplays[y+i].classList.add("win");
                }
                ///////////////////////
                return true;
            }
        }
        return false;
    }

    function verticalWin(){
        for (var i = 0; i < 3; i++){
            sum = 0;
            for (var y = 0; y < 7; y += 3) {
                sum += tdDisplays[i + y].tableValue;
            }
            if(Math.abs(sum)===3){
                ////////////////////////
                for (var y = 0; y < 7; y += 3) {
                    tdDisplays[y+i].classList.add("win");
                }
                ///////////////////////
                return true;
            }
            
        }
        return false;
    }

    function diag1Win(){
        sum=0;
        for (var y = 0; y < 9; y += 4) {
            sum += tdDisplays[y].tableValue;
        }
        if(Math.abs(sum)===3){
            ///////////////////////
            for (var y = 0; y < 9; y += 4) {
                tdDisplays[y].classList.add("win");
            }
            ///////////////////////
            return true;
        }
        return false;
    }

    function diag2Win(){
        sum=0;
        for (var y = 2; y < 7; y += 2) {
            sum += tdDisplays[y].tableValue;
        }
        if(Math.abs(sum)===3){
            ///////////////////////
            for (var y = 2; y < 7; y += 2) {
                tdDisplays[y].classList.add("win");
            }
            ///////////////////////
            return true;
        }
        return false;
    }

}


