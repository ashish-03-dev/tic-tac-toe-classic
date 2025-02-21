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

    await delay(1200);//wait for heading animation

    disableBoxes();

    //make game appear
    await appearFlex(game, 400);// 1000 ms for appear

    await delay(450);
    callRoundBoard();
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


function enableBoxes() {
    let board = document.querySelector(".board");
    board.style.pointerEvents = "auto";
}

function disableBoxes() {
    let board = document.querySelector(".board");
    board.style.pointerEvents = "none";
}


async function callRoundBoard() {
    let str = `<p><i>Round ${roundNumber}</i></p>`;
    round.innerHTML = str;

    await appearBlock(round, 200);
    await delay(900);//let user see round board after appearing

    await fadeOut(round, 200);
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
boxNodes.forEach((box) => {
    box.onclick = (evt) => {
        let n = evt.target.closest(".box").id;
        fill(box, n);
    }
}
);


let player1Boxes = [];
let player2Boxes = [];

//every click
async function fill(box, n) {
    if (!box.querySelector(".tick")) {

        let div = document.createElement("div");
        div.innerHTML = code;
        div.classList.add("tick");
        box.append(div);

        selectBox(n);
        boxesFilled++;
        insetShadow(box);
        await delay(10);
        div.style.scale = "0.92";
        checkWinner();
    }
    else {
        wrongMove();
    }

}

async function insetShadow(box) {
    box.classList.add("clicked");
    await delay(180);
    box.classList.add("insetShadow");
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
    if (turn0) player1Boxes.push(n)
    else player2Boxes.push(n);
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
    if (turn0)
        turn.innerHTML = "<p>TURN: O</p>";
    else
        turn.innerHTML = "<p>TURN: X</p>";
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
//check Winner
async function checkWinner() {

    let checkPlayer;
    if (turn0)
        checkPlayer = player1Boxes;
    else
        checkPlayer = player2Boxes;


    for (let listP of winPatterns) {
        let isSubset = listP.every(num => new Set(checkPlayer.map(Number)).has(num));
        if (isSubset == true) {

            // disable boxes
            disableBoxes();

            await delay(300);
            //inset Shadow
            boxUnavailable();

            await delay(800);
            zoomInBoxes(listP);

            await delay(700);
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

function boxUnavailable() {
    boxNodes.forEach((box) => {
        insetShadow(box);
    })
}

//zoom
async function zoomInBoxes(listP) {
    let strArray = listP.map(String);
    for (let i of strArray) {
        let box = document.getElementById(i);
        let tick = box.querySelector(".tick");
        tick.style.scale = "1.15";
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
        tick.style.scale = ".92";
    }
}


//draw condition fnx
async function drawFnx() {
    //disable boxes
    disableBoxes();

    await delay(1200);

    // open DrawBoard;
    await appearBlock(draw, 400);

    await delay(1400); //let user see

    // close DrawBoard
    await fadeOut(draw, 400);//transition

    roundOver();
}


//Every round Over
async function roundOver() {
    countPlayerScore(); //set player wins value
    roundNumber += 1; //increase round
    await delay(800); //given time to see board boxes
    resetGame();
    await delay(1000); // 300ms for reset Shadows
    if (roundNumber > 3)
        showWinner();
    else {
        callRoundBoard();
        setTimeout(changeTurn, 1500);
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


async function showWinner() {
    writeWinner();
    await appearBlock(winner, 400);

    await delay(2300);

    await fadeOut(winner, 400);
    await delay(200);
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


//reset Game
function resetGame() {
    boxesFilled = 0;
    boxNodes.forEach((box) => {
        //remove box ticks
        let div = box.querySelector(".tick");
        if (div) div.remove();

        upShadow(box); //reset box hover effect and shadow
    })

    //set player boxes empty
    player1Boxes.splice(0, player1Boxes.length);
    player2Boxes.splice(0, player2Boxes.length);

}

async function upShadow(box) {
    box.classList.remove("insetShadow");
    await delay(180);
    box.classList.remove("clicked");
}


async function closeGame() {

    await delay(500);
    await fadeOut(game, 400);

    //call replay Board
    appearBlock(replay, 500);
}

replay.addEventListener("click", restartGame);

async function restartGame() {
    await fadeOut(replay, 500);

    playerOWin = 0;
    playerXWin = 0;
    setScoreNumber();

    await appearFlex(game, 400);
    roundNumber = 1;
    callRoundBoard();
}