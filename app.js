// classes to be used acording to game states
/*
* when game is not started : 
    gameBody = ['bg-orange-300']
    startGameBtn = ['bg-white','hover:bg-orange-400','hover:text-white','hover:font-bold','hover:scale-105']

* when game is started :
    gameBody = ['bg-orange-300']
    startGameBtn = ['bg-orange-400']

* when game ends :
    gameBody = ['bg-green-300']
    startGameBtn = ['bg-green-400','hover:bg-green-500','hover:text-white','hover:font-bold','hover:scale-105']
*/

// html elements
const gameGrid = document.querySelectorAll("#game-body > div")
const infoBar = document.querySelector('#infoBar > span');
const gameBody = document.querySelector('body > div');
const startGameBtn = document.getElementById('startGameBtn');
const playerOneInputBox = document.getElementById('playerOneInput');
const playerTwoInputBox = document.getElementById('playerTwoInput');

// variables
let turn = 1;
let gameStarted = false;
let playerOneName = 'John';
let playerTwoName = 'Smith';
let markedGridsCount = 0;


// functions
function startGame () {

    // clear grid before playing
    gameGrid.forEach((grid) => {
        grid.innerHTML = '';
    });

    // reset marked grids count
    markedGridsCount = 0;

    // set game body color
    gameBody.classList.add("bg-orange-300");

    // change button appearance
    startGameBtn.textContent = "Game Started!";
    startGameBtn.classList.remove('bg-white','hover:bg-orange-400','hover:text-white','hover:font-bold','hover:scale-105','hover:bg-green-500');
    startGameBtn.classList.toggle('bg-orange-400');

    // set boolean to true
    gameStarted = true;

    // TODO : retrive values for input box
    console.log(playerOneInputBox.value);
    playerOneName = playerOneInputBox.value;
    playerTwoName = playerTwoInputBox.value;


    // set info bar text
    infoBar.innerHTML = playerOneName + "'s Turn";

}

function endGame (mark) {

    // check which player won
    if (mark === 'X'){
        infoBar.textContent = playerOneName + " Won!";
    } 
        
    else {
        infoBar.textContent = playerTwoName + " Won!";
    }

    // stop the game
    gameStarted = false;

    // change startGameBtn
    startGameBtn.textContent = "Click here to play again!";
    startGameBtn.classList.remove('bg-orange-400');
    startGameBtn.classList.add('bg-green-400','hover:bg-green-500','hover:text-white','hover:font-bold','hover:scale-105');

    // change background color to show something happend
    gameBody.classList.remove("bg-orange-300");
    gameBody.classList.add("bg-green-300","transition","duration-300","ease-in-out");




}

function gameTie () {

}


function checkWinner (gridMatrix) {
    
    // check row wise
    for (let i = 0; i < 3; i ++) {
        if (gridMatrix[0][i] === gridMatrix[1][i] && gridMatrix[1][i] === gridMatrix[2][i])
            return gridMatrix[0][i];
    }

    // check column wise
    for (let i = 0; i < 3; i ++){

            if (gridMatrix[i][0] === gridMatrix[i][1] && gridMatrix[i][1] === gridMatrix[i][2])
            return gridMatrix[i][0];
    }

    // check main diagonal (left to right)
    if (gridMatrix[0][0] === gridMatrix[1][1] && gridMatrix[1][1] === gridMatrix[2][2])
        return gridMatrix[0][0];

    if (gridMatrix[0][2] === gridMatrix[1][1] && gridMatrix[1][1] == gridMatrix[2][0])
        return gridMatrix[0][2];


    // else return empty string to indicate no winner was found
    return '';

}

function markGrid (event) {

    currentGrid = event.currentTarget;

    // if game has started only then mark the grid
    if (gameStarted){

        if (turn === 1) {
            
            

            // check if the currentGrid is empty or not
            if (currentGrid.innerHTML === ''){
                currentGrid.innerHTML = 'X';
                turn = 2;
                infoBar.innerHTML = playerTwoName + "'s Turn";

                // increase count
                markedGridsCount++;
            }

        } 

        else 
        {
            infoBar.innerHTML = playerTwoName + "'s Turn";

            if (currentGrid.innerHTML === '')
            {
                currentGrid.innerHTML = 'O';
                turn = 1;
                infoBar.innerHTML = playerOneName + "'s Turn";
                // increase count
                markedGridsCount++;
            }
        }


    }

    // check winner
    topLeftGrid = document.getElementById("topLeftGrid").innerHTML;
    topMiddleGrid = document.getElementById("topMiddleGrid").innerHTML;
    topRightGrid = document.getElementById("topRightGrid").innerHTML;
    middleLeftGrid = document.getElementById("middleLeftGrid").innerHTML;
    middleMiddleGrid = document.getElementById("middleMiddleGrid").innerHTML;
    middleRightGrid = document.getElementById("middleRightGrid").innerHTML;
    bottomLeftGrid = document.getElementById("bottomLeftGrid").innerHTML;
    bottomMiddleGrid = document.getElementById("bottomMiddleGrid").innerHTML;
    bottomRightGrid = document.getElementById("bottomRightGrid").innerHTML;
    
    
    grid2D = [
        [topLeftGrid,topMiddleGrid,topRightGrid],
        [middleLeftGrid,middleMiddleGrid,middleRightGrid],
        [bottomLeftGrid,bottomMiddleGrid,bottomRightGrid]
    ];
    
    const mark = checkWinner(grid2D);
    console.log(markedGridsCount);
    // if there is a winner
    if (mark != ''){
        endGame(mark);
    } else if (markedGridsCount === 9) {
        gameTie();
    }

        
}



// event listeners
gameGrid.forEach(function(grid) {
    grid.addEventListener("click",markGrid);
});
startGameBtn.addEventListener("click",startGame);

