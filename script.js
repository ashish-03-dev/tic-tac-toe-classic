let number = document.querySelector(".number");
let counter = 0;

setInterval(() => {
    if (counter == 100) {
        clearInterval;
    } else {
        counter += 1;
        number.innerHTML = `${counter}%`;
    }
}, 25);



document.addEventListener("DOMContentLoaded", async function () {

    await delay(3000);//given time to load

    await fadeOut(loader, 400);// fade out loader

    heading.style.opacity = "1";
    await delay(1000);//heading appearance

    //make heading animation
    heading.classList.add("animate");

    await delay(1600);//wait for heading animation

    disableBoxes();

    //make game appear
    await appearFlex(game, 1000);// 1000 ms for appear

    call3Round();
})



function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function appearFlex(node, ms) {
    return new Promise(async resolve => {
        node.style.display = "flex";

        await delay(100);// give time for rendering display

        node.style.opacity = "1";
        node.style.visibility = "visible";

        await delay(ms);//time for transition

        resolve();
    });
}

function appearBlock(node, ms) {
    return new Promise(async resolve => {
        node.style.display = "block";

        await delay(100);// give time for rendering display

        node.style.opacity = "1";
        node.style.visibility = "visible";

        await delay(ms);//time for transition

        resolve();
    });
}


function fadeOut(node, ms) {
    return new Promise(async resolve => {

        node.style.opacity = "0";

        await delay(ms);//time for element to transition

        node.style.display = "none";
        node.style.visibility = "hidden";
        resolve();
    });
}



let code = '<i class="fa-regular fa-circle"></i>';
let turn0 = true;

let roundNumber = 1;
let playerOWin = 0;
let playerXWin = 0;

let loader = document.querySelector(".loadingScreen");
let heading = document.querySelector(".heading");
let game = document.querySelector(".game");
let draw = document.querySelector(".drawBoard");
let winner = document.querySelector(".winner");
let round = document.querySelector(".round");
let replay = document.querySelector(".replay");


function makeBoxesAppear() {
    let boxNodes = document.querySelectorAll(".box");
    boxNodes.forEach((box) => {
        box.style.scale = "1";
    })

}

function makeBoxesDisappear() {
    let boxNodes = document.querySelectorAll(".box");
    boxNodes.forEach((box) => {
        box.style.scale = "0";
    })

}

function enableBoxes() {
    let board = document.querySelector(".board");
    board.style.pointerEvents = "auto";
}

function disableBoxes() {
    let board = document.querySelector(".board");
    board.style.pointerEvents = "none";
}


async function call3Round() {

    round.innerHTML = `<p><i>3 Rounds</i></p>`;

    await appearBlock(round, 1200);
    roundNumber = 1;

    //call round Number
    callRoundBoard()
}



async function callRoundBoard() {
    let str = `<p><i>Round ${roundNumber}</i></p>`;
    round.innerHTML = str;

    await appearBlock(round, 400);

    await delay(900);//let user see round board after appearing

    //grow animation
    roundFnxOut(round);
}

async function roundFnxOut(round) {

    await fadeOut(round, 400);

    showTurnArea();
    showTurn();


    enableBoxes();// enable boxes for clicks
}



function showTurnArea() {
    let turn = document.querySelector(".turn");
    turn.style.opacity = "1";
}
function hideTurnArea() {
    let turn = document.querySelector(".turn");
    turn.style.opacity = "0";
}

function setScoreNumber() {

    let s1 = document.querySelector(".playerOWin");
    s1.innerText = playerOWin;
    let s2 = document.querySelector(".playerXWin");
    s2.innerText = playerXWin;

}


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

//every click
function fill(node, n) {
    if (!node.querySelector(".tick")) {

        let tick = document.createElement("div");
        tick.innerHTML = code;
        tick.classList.add("tick");
        node.append(tick);
        node.classList.add("clicked");

        selectBox(n);
        boxesFilled++;
        checkWinner();

    }
    else {
        wrongMove();
    }

}


//wrong move animation
function wrongMove() {
    let wrong = document.querySelector(".wrongMove");

    wrong.style.opacity = "1";

    setTimeout(() => {
        wrong.style.opacity = "0";
    }, 1200);

}

//push box into players box list
function selectBox(n) {
    if (turn0) {
        player1Boxes.push(n)
    } else {
        player2Boxes.push(n);
    }
}


//changes turn
function changeTurn() {
    if (turn0) {
        turn0 = false;
        code = '<i class="fa-solid fa-xmark"></i>';

    } else {
        turn0 = true;
        code = '<i class="fa-regular fa-circle"></i>';

    }
    showTurn();
}

function showTurn() {
    let turn = document.querySelector(".turn");
    if (turn0) turn.innerHTML = "<p>TURN: O</p>";
    else turn.innerHTML = "<p>TURN: X</p>";
}

//check Winner
function checkWinner() {

    let checkPlayer;
    if (turn0)
        checkPlayer = player1Boxes;
    else
        checkPlayer = player2Boxes;


    for (let listP of winPatterns) {
        let isSubset = listP.every(num => new Set(checkPlayer.map(Number)).has(num));
        if (isSubset == true) {

            //glow boxes
            zoomInBoxes(listP);

            // disable boxes
            disableBoxes();

            //after win
            roundOver();
            return;
        }
    }

    //draw Condition
    if (boxesFilled == 9) {
        drawFnx();
    } else {
        //no winner so next turn
        changeTurn();
    }

}


//draw condition fnx
async function drawFnx() {
    //disable boxes
    disableBoxes();

    roundNumber += 1;

    await delay(1300);

    // open DrawBoard;
    await appearBlock(draw, 400);

    await delay(1400); //let user see

    // close DrawBoard
    await fadeOut(draw, 400);//transition

    //allow to see drawn match
    await delay(1100);

    resetGame();

    await delay(1500);

    if (roundNumber > 3) {
        showWinner();
    } else {
        changeTurn();
        callRoundBoard();
    }
}



//transition after winner
async function roundOver() {

    //set player wins value
    countPlayerScore();

    //increase round
    roundNumber += 1;

    //given time to see board boxes
    await delay(2500);

    resetGame();

    await delay(500);

    if (roundNumber > 3)
        showWinner();
    else {
        callRoundBoard();
        setTimeout(changeTurn, 1500);
    }
}


//glow the zoom and cleared by reset
async function zoomInBoxes(listP) {
    let strArray = listP.map(String);
    for (let i of strArray) {
        let box = document.getElementById(i);
        let tick = box.querySelector(".tick");
        tick.style.scale = "1.2";
    }

    await delay(400);
    zoomOutBoxes(listP);
}

//remove zoom
function zoomOutBoxes(listP) {
    let strArray = listP.map(String);
    for (let i of strArray) {
        let box = document.getElementById(i);
        let tick = box.querySelector(".tick");
        tick.style.scale = "1";
    }
}


//set player wins
function countPlayerScore() {
    if (turn0) {
        playerOWin++;
    } else {
        playerXWin++;
    }

    //set Score in display
    setTimeout(setScoreNumber, 1500);
}


//reset Game
function resetGame() {
    boxesFilled = 0;
    boxNodes.forEach((box) => {

        //remove box ticks
        let tick = box.querySelector(".tick");


        if (tick) {
            tick.remove();
        }

        //reset box hover effect
        box.classList.remove("clicked");
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


async function showWinner() {
    writeWinner();
    await appearBlock(winner, 400);

    await delay(2300);

    await fadeOut(winner, 400);
    closeGame();
}

//Write in Winner Board
function writeWinner() {
    hideTurnArea();
    let winnerName = document.querySelector(".winnerName");

    if (playerOWin == playerXWin) {
        winnerName.closest("div").style.width = "330px";
        winnerName.innerText = "Game Drawn";
    }
    else {
        winnerName.closest("div").style.width = "370px";
        if (playerOWin > playerXWin) {
            winnerName.innerText = "Player O WON";
        } else {
            winnerName.innerText = "Player X WON";
        }
    }
}



async function closeGame() {
    makeBoxesDisappear();
    await delay(1000);
    await fadeOut(game, 600);
    //call replay Board
    appearBlock(replay, 500);
}

replay.addEventListener("click", restartGame);

async function restartGame() {
    await fadeOut(replay, 500);

    makeBoxesAppear();

    await delay(500);
    playerOWin = 0;
    playerXWin = 0;
    setScoreNumber();

    await appearFlex(game, 400);
    call3Round();
}