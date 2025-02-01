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

        setTimeout(() => {
            game.style.opacity = "1";
            roundFnx();
        }, 100);


    }, 300);
});

function roundFnx() {

    setTimeout(() => {
        let node = document.querySelector(".round");
        node.style.display = "block";
        setTimeout(() => {
            node.style.opacity = "1";
            setTimeout(() => {
                node.style.opacity = "0";
                setTimeout(() => {
                    node.style.display = "none";

                }, 500)
            }, 1500)
        }, 100)
    }, 500)
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