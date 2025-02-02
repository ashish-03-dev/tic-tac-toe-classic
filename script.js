document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {

        let load = document.querySelector(".loadingScreen");
        load.style.opacity = "0";
        load.style.visibility = "hidden";

        setTimeout(function () {

            load.style.display = "none";

            let page = document.querySelector(".page");
            page.style.display = "flex";

            let opponent = document.querySelector(".opponent");
            opponent.style.display = "flex";

            setTimeout(() => {
                page.style.opacity = "1";

                setTimeout(() => {
                    opponent.style.opacity = "1";

                }, 600)

            }, 100);


        }, 500);


    }, 1200);
});


let selectedPlayer;
let opponent = document.querySelector(".opponent");

opponent.onclick = (evt) => {

    selectedPlayer = evt.target.closest("button").value;
    closeOpponentFnx(opponent);
}



function closeOpponentFnx(opponent) {

    opponent.style.opacity = "0";
    setTimeout(() => {
        opponent.style.display = "none";

        if (selectedPlayer == "double") {

            gameFnx();

        } else {

            openChooseMark();
        }

    }, 300)

}




function openChooseMark() {

    let mark = document.querySelector(".symbol");
    mark.style.display = "block";

    setTimeout(() => {

        mark.style.opacity = "1";

    }, 100)

}

function closeChooseMark() {

    let choose = document.querySelector(".symbol");
    choose.style.opacity = "0";

    setTimeout(function () {

        choose.style.display = "none";
        gameFnx();

    }, 300);

}


let playerSign = "circle";
let computerSign;
let code = '<i class="fa-regular fa-circle"></i>';
let turn0 = true;

let mark = document.querySelector(".choose");
mark.addEventListener("click", (evt) => {

    playerSign = evt.target.closest("button").value;

    if (playerSign == "cross") {
        computerSign = "cross";
        code = '<i class="fa-solid fa-xmark"></i>';
        turn0 = false;
    }
    else {
        computerSign = "circle";
        code = '<i class="fa-regular fa-circle"></i>';
        turn0 = true;
    };

    closeChooseMark();

});




let roundNumber = 1;
let playerOWin = 0;
let playerXWin = 0;


//game inside page
function gameFnx() {

    //call 3 Round Board and game visibility
    call3Round();

}


function disableBoxes() {
    let board = document.querySelector(".board");
    board.style.pointerEvents = "none";
}

function enableBoxes() {
    let board = document.querySelector(".board");
    board.style.pointerEvents = "auto";
}

function call3Round() {

    disableBoxes();

    //make game visibility
    let game = document.querySelector(".game");
    game.style.display = "flex";

    let round = document.querySelector(".round");
    round.style.display = "block";
    round.innerHTML = `<p><i>3 Rounds</i></p>`;

    setTimeout(() => {

        //make game visibility
        game.style.opacity = "1";
        round.style.opacity = "1";

        setTimeout(() => {
            roundNumber = 1;

            //call round Number
            callRoundBoard()
        }, 1300);

    }, 100);
}


function callRoundBoard() {

    changeTurn();

    makeCaptionVisible();

    let round = document.querySelector(".round");
    round.style.display = "block";

    let str = `<p><i>Round ${roundNumber}</i></p>`;
    round.innerHTML = str;

    setTimeout(() => {

        round.style.opacity = "1";

    }, 100);


    //grow animation
    roundFlex(round);

}


function makeCaptionVisible() {
    //make caption visible
    let caption = document.querySelector(".caption");
    caption.style.visibility = "visible";
    caption.style.opacity = "1";
}

function makeCaptionInvisible() {
    //make caption invisible
    let caption = document.querySelector(".caption");
    caption.style.visibility = "hidden";
    caption.style.opacity = "0";
}


function roundFlex(round) {

    //remove round board
    roundFnxOut(round);
}


function roundFnxOut(round) {
    setTimeout(() => {
        round.style.opacity = "0";

        setTimeout(() => {
            round.style.display = "none";
            enableBoxes();

        }, 400)

    }, 1300)
}


function setScoreNumber() {

    let s1 = document.querySelector(".player0Win");
    s1.innerText = playerOWin;
    let s2 = document.querySelector(".playerXWin");
    s2.innerText = playerXWin;

}




// if (selectedPlayer == "double") {

// } else {

// }


let boxesFilled = 0;
let boxNodes = document.querySelectorAll(".box");
boxNodes.forEach((node) => {
    node.onclick = (evt) => {
        let n = evt.target.closest(".box").id;
        fill(node, n);
    }
}
);


let player1Boxes = [];
let player2Boxes = [];


function fill(node, n) {
    if (!node.querySelector(".tick")) {

        let tick = document.createElement("div");
        tick.innerHTML = code;
        tick.classList.add("tick");
        node.append(tick);

        selectBox(n);
        boxesFilled++;
        checkWinner();

    }
    else {
        wrongMove();
    }

}

function wrongMove() {
    let wrong = document.querySelector(".wrongMove");
    wrong.style.display = "block";
    setTimeout(() => {

        wrong.style.opacity = "1";
        setTimeout(() => {

            wrong.style.opacity = "0";
            setTimeout(() => {

                wrong.style.display = "none";

            }, 300);

        }, 1200);

    }, 10);

}


function selectBox(n) {
    if (turn0) {
        player1Boxes.push(n)
    } else {
        player2Boxes.push(n);
    }
}



function changeTurn() {
    if (turn0) {
        turn0 = false;
        code = '<i class="fa-solid fa-xmark"></i>';

    } else {
        turn0 = true;
        code = '<i class="fa-regular fa-circle"></i>';

    }
}



function checkWinner() {

    let checkPlayer;
    if (turn0)
        checkPlayer = player1Boxes;
    else
        checkPlayer = player2Boxes;


    for (let listP of winPatterns) {
        let isSubset = listP.every(num => new Set(checkPlayer.map(Number)).has(num));
        if (isSubset == true) {
            glowBoxes(listP);
            disableBoxes();
            roundOver();
            return;
        }
    }

    //draw Condition
    if (boxesFilled == 9) {
        drawFnx();
    }

    //no winner so next turn
    changeTurn();

}


function drawFnx() {

    roundNumber += 1;

    setTimeout(() => {

        if (roundNumber > 3) {

            resetGame();
            showWinner();

            //opens Draw Board

        } else {

            openDrawBoard();

            setTimeout(() => {

                closeDrawBoard();
                resetGame();
                setTimeout(() => {

                    callRoundBoard();

                }, 400);

            }, 2500);

        }

    }, 1500);
}

function openDrawBoard() {
    let draw = document.querySelector(".drawBoard");
    draw.style.display = "block";
    setTimeout(() => {
        draw.style.opacity = "1";

    }, 100);
}

function closeDrawBoard() {
    let draw = document.querySelector(".drawBoard");
    draw.style.opacity = "0";
    setTimeout(() => {
        draw.style.display = "none";

    }, 400);
}

//transition of winner
function roundOver() {

    countPlayerScore();

    roundNumber += 1;

    setTimeout(() => {


        setTimeout(() => {
            resetGame();
            if (roundNumber > 3)
                showWinner();
            else
                callRoundBoard();

        }, 800)
    }, 2500)

}


function glowBoxes(listP) {
    let strArray = listP.map(String);

    for (let i of strArray) {

        let box = document.getElementById(i);
        box.classList.add("glow");
    }
}


//set score 
function countPlayerScore() {
    if (turn0) {
        playerOWin++;
    } else {
        playerXWin++;
    }

    //set Score in display
    setTimeout(setScoreNumber, 1500);
}



//reset Button
let resetBtn = document.querySelector(".reset");
resetBtn.addEventListener("click", resetGame);

//reset function
function resetGame() {
    boxesFilled = 0;
    boxNodes.forEach((box) => {

        //remove box ticks
        let tick = box.querySelector(".tick");
        //remove box glow
        box.classList.remove("glow");

        if (tick) {
            tick.remove();
        }
    })

    player1Boxes.splice(0, player1Boxes.length);
    player2Boxes.splice(0, player2Boxes.length);

}


const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];


function showWinner() {
    winnerStatusBoard();
    setTimeout(statusBoardClose, 2500);
}

//winning board according to Player wins
function winnerStatusBoard() {

    let winnerName = document.querySelector(".winnerName");

    if (playerOWin == playerXWin) {

        winnerName.innerText = "Draw";

    } else {

        winnerName.closest("div").style.width = "370px";

        if (playerOWin > playerXWin) {

            winnerName.innerText = "Player O WON";

        } else {

            winnerName.innerText = "Player X WON";
        }

    }
    let node = document.querySelector(".winner");
    node.style.display = "block";
    setTimeout(() => {
        node.style.opacity = "1";
    }, 100);
}


function statusBoardClose() {
    let node = document.querySelector(".winner");
    node.style.opacity = "0";
    setTimeout(() => {
        node.style.display = "none";

        //closing game call
        closeGame();
    }, 400);
}

function closeGame() {
    let game = document.querySelector(".game");
    game.style.opacity = "0";

    setTimeout(() => {
        game.style.display = "none";

        //call replay Board
        replayBoard();
    }, 200);
}

function replayBoard() {
    let replay = document.querySelector(".replay");
    replay.style.display = "block";
    setTimeout(() => {
        replay.style.opacity = "1";
    }, 100);
}


let replay = document.querySelector(".replay");
replay.addEventListener("click", restartGame);


function restartGame() {
    let replay = document.querySelector(".replay");
    replay.style.opacity = "0";
    setTimeout(() => {
        replay.style.display = "none";
        playerOWin = 0;
        playerXWin = 0;
        setScoreNumber();
        call3Round();
    }, 500)
}