document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {

        let load = document.querySelector(".loadingScreen");
        load.style.opacity = "0";
        load.style.visibility = "hidden";


        setTimeout(function () {

            load.style.display = "none";

            let page = document.querySelector(".page");
            page.style.display = "flex";

            let symbol = document.querySelector(".symbol");
            symbol.style.display = "block";

            setTimeout(() => {
                page.style.opacity = "1";

                setTimeout(() => {
                    symbol.style.opacity = "1";

                }, 600)
            }, 100);


        }, 500);


    }, 1200);
});


let denote;
let computerSign;
let code;

let selected = document.querySelector(".choose");
selected.addEventListener("click", (evt) => {

    denote = evt.target.closest("button").value;
    let symbol = document.querySelector(".symbol");
    symbol.style.opacity = "0";


    if (denote == "cross") {
        computerSign = "cross";
        code = '<i class="fa-solid fa-xmark"></i>';
    }
    else {
        computerSign = "circle";
        code = '<i class="fa-regular fa-circle"></i>';
    };

    setTimeout(function () {

        symbol.style.display = "none";

        let heading = document.querySelector(".heading");
        heading.style.position = "relative";

        let game = document.querySelector(".game");
        game.style.display = "flex";

        let round = document.querySelector(".round");
        round.style.display = "block";

        setTimeout(() => {
            game.style.opacity = "1";
            round.style.opacity = "1";
            roundFnxOut();
        }, 100);


    }, 300);
});

function roundFnxOut() {

    let round = document.querySelector(".round");

    setTimeout(() => {
        round.style.opacity = "0";

        setTimeout(() => {
            round.style.display = "none";
        }, 600)

    }, 1500)
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