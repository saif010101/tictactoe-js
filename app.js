// html elements
const gameGrid = document.querySelectorAll("#game-body > div")
const startGameBtn = document.getElementById('startGameBtn');
const infoBar = document.querySelector('#infoBar > span');

// variables
let turn = 1;
let gameStarted = false;
const playerOneName = 'John';
const playerTwoName = 'Smith';


// functions
function startGame () {


    // change button appearance
    startGameBtn.textContent = "Game Started!";
    startGameBtn.classList.remove('bg-white','hover:bg-orange-400','hover:text-white','hover:font-bold','hover:scale-105');
    startGameBtn.classList.add('bg-orange-400');

    // set boolean to true
    gameStarted = true;

    // TODO : retrive values for input box
    

    // set info bar text
    infoBar.innerHTML = playerOneName + "'s Turn";

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

    if (checkWinner(grid2D) != ''){
        console.log("winner found!!!!");
    }
}



// event listeners
gameGrid.forEach(function(grid) {
    grid.addEventListener("click",markGrid);
});
startGameBtn.addEventListener("click",startGame);

