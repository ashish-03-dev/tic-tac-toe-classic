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


let selectedPlayer

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



let denote = "circle";
let computerSign;
let code = '<i class="fa-regular fa-circle"></i>';
let turn0 = true;


let mark = document.querySelector(".choose");
mark.addEventListener("click", (evt) => {

    denote = evt.target.closest("button").value;

    if (denote == "cross") {
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



function closeChooseMark() {

    let choose = document.querySelector(".symbol");
    choose.style.opacity = "0";


    setTimeout(function () {

        choose.style.display = "none";

        gameFnx();

    }, 300);

}



function gameFnx() {

    let heading = document.querySelector(".heading");
    heading.style.position = "relative";

    let game = document.querySelector(".game");
    game.style.display = "flex";

    let round = document.querySelector(".round");
    round.style.display = "block";

    setTimeout(() => {

        game.style.opacity = "1";
        round.style.opacity = "1";

        roundFnxOut(round);

    }, 100);

}


function roundFnxOut(round) {

    setTimeout(() => {
        round.style.opacity = "0";

        setTimeout(() => {
            round.style.display = "none";
        }, 400)

    }, 1500)
}



// if (selectedPlayer == "double") {

// } else {

// }



let player1Boxes = [];
let player2Boxes = [];



function fill(node, n) {

    if (!node.querySelector(".tick")) {

        let tick = document.createElement("div");
        tick.innerHTML = code;
        tick.classList.add("tick");
        node.append(tick);

        selectBox(n);

        checkScore();

        changeTurn();

    } else {
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



let boxNodes = document.querySelectorAll(".box");

boxNodes.forEach((node) => {

    node.onclick = (evt) => {

        let n = evt.target.closest(".box").id;

        if (turn0) {

            fill(node, n);


        } else {

            fill(node, n);

        }


    }
}
);


function changeTurn() {
    if (turn0) {
        turn0 = false;
        code = '<i class="fa-solid fa-xmark"></i>';

    } else {
        turn0 = true;
        code = '<i class="fa-regular fa-circle"></i>';

    }
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


function checkScore() {

    let checkPlayer;
    if (turn0)
        checkPlayer = player1Boxes;
    else
        checkPlayer = player2Boxes;


    for (let listP of winPatterns) {
        let isSubset = listP.every(num => new Set(checkPlayer.map(Number)).has(num));
        if (isSubset == true) {
            glowCell(listP);
            setTimeout(openWinner, 1000);
            break;
        }
    }
}

function glowCell(listP) {

    let strArray = listP.map(String);

    for (let i of strArray) {

        let box = document.getElementById(i);
        box.style.boxShadow = "0 0 10px 10px rgba(255, 255, 255, .8)";
        console.log(i);
    }
}

function openWinner() {
    let node = document.querySelector(".winner");
    node.style.display = "block";
    setTimeout(() => {
        node.style.opacity = "1";
    }, 100)
}


let reset = document.querySelector(".reset");

reset.onclick = () => {

    boxNodes.forEach((node) => {

        let div = node.querySelector(".tick");

        if (div) {
            div.remove();
        }
    })
    player1Boxes.splice(0, player1Boxes.length);
    player2Boxes.splice(0, player2Boxes.length);

    closeWinnerBoard();

}

function closeWinnerBoard() {
    let node = document.querySelector(".winner");
    node.style.opacity = "0";

    setTimeout(() => {

        node.style.display = "none";

    }, 300)

}