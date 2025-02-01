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
                symbol.style.opacity = "1";
            }, 100);


        }, 500);


    }, 1000);
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
        let game = document.querySelector(".game");
        game.style.display = "flex";


        setTimeout(() => {
            game.style.opacity = "1";
        }, 100);


    }, 500);
});


let clickedNodes = document.querySelectorAll(".box");

clickedNodes.forEach((node) => {
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
    clickedNodes.forEach((node) => {
        let div = node.querySelector(".tick");
        if (div) {
            div.remove();
        }
    })
}