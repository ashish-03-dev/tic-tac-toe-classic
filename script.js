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

    let game = document.querySelector(".game");
    game.style.display = "flex";

    let round = document.querySelector(".round");
    round.style.display = "block";
    round.innerHTML = `<p><i>3 Rounds</i></p>`;

    setTimeout(() => {

        //call game visibility
        game.style.opacity = "1";
        round.style.opacity = "1";


        setTimeout(() => {
            roundNumber = 1;
            callRoundBoard()
        }, 1300);

    }, 100);
}


function callRoundBoard() {

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

        checkWinner();

    }
    else {
        wrongmove();
    }

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
            setTimeout(openWinnerBoard, 600);
            return;
        }
    }

    //no winner so next turn
    changeTurn();

}


function glowBoxes(listP) {
    let strArray = listP.map(String);

    for (let i of strArray) {

        let box = document.getElementById(i);
        box.classList.add("glow");
    }
}



function openWinnerBoard() {
    let node = document.querySelector(".winner");
    node.style.display = "block";

    openGlowName();

    setGameScore();

    roundNumber += 1;

    setTimeout(() => {

        node.style.opacity = "1";

        setTimeout(closeWinnerBoard, 1800);

    }, 100)
}


function closeWinnerBoard() {

    let node = document.querySelector(".winner");
    node.style.opacity = "0";

    closeGlowName();

    setTimeout(() => {
        node.style.display = "none";
        resetGame();


        if (roundNumber > 3) {

            showReplay();

        } else {

            callRoundBoard();
        }

    }, 400)

}

//set score 
function setGameScore() {
    if (turn0) {
        playerOWin++;
    } else {
        playerXWin++;
    }
    //set Score in display
    setTimeout(setScoreNumber, 1500);
}



function openGlowName() {

    let playerName;

    if (turn0) {
        playerName = document.getElementById("player0");
    } else {
        playerName = document.getElementById("playerX");
    }

    playerName.classList.add("glow");
}


function closeGlowName() {

    let playerName;

    if (turn0) {
        playerName = document.getElementById("player0");
    } else {
        playerName = document.getElementById("playerX");
    }

    playerName.classList.remove("glow");

    changeTurn();
}



//reset Button
let resetBtn = document.querySelector(".reset");
resetBtn.addEventListener("click", resetGame);

//reset function
function resetGame() {
    boxNodes.forEach((box) => {

        let tick = box.querySelector(".tick");
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

function showReplay() {
    let heading = document.querySelector(".heading");
    heading.style.position = "absolute";

    let game = document.querySelector(".game");
    game.style.opacity = "0";

    setTimeout(() => {
        game.style.display = "none";

        replayBoard();

    }, 100);

}

function replayBoard() {
    let play = document.querySelector(".replay");
    console.log(play);
    play.style.opacity = "1";
    play.style.display = "block";
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