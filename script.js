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
let code;

let mark = document.querySelector(".choose");
mark.addEventListener("click", (evt) => {

    denote = evt.target.closest("button").value;

    if (denote == "cross") {
        computerSign = "cross";
        code = '<i class="fa-solid fa-xmark"></i>';
    }
    else {
        computerSign = "circle";
        code = '<i class="fa-regular fa-circle"></i>';
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



if(selectedPlayer=="double"){

}else{

}



let boxNodes = document.querySelectorAll(".box");

boxNodes.forEach((node) => {

    node.onclick = () => {

        if (!node.querySelector(".tick")) {

            let tick = document.createElement("div");
            tick.innerHTML = code;
            tick.classList.add("tick");
            node.append(tick);
        }
    }
}
);

let reset = document.querySelector(".reset");

reset.onclick = () => {

    boxNodes.forEach((node) => {

        let div = node.querySelector(".tick");

        if (div) {
            div.remove();
        }
    })
}