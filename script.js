window.scrollTo(0,1);
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        let load = document.querySelector(".loadingScreen");
        load.style.opacity = "0";
        load.style.visibility = "hidden";


        setTimeout(function () {
            load.style.display = "none";
            let page = document.querySelector(".symbol");
            page.style.display = "block";


            setTimeout(() => {
                page.style.opacity = "1";
            }, 100);


        }, 1000);
    }, 1000);
});


let denote;
let computerSign;
let code;

let selected = document.querySelector(".choose");
selected.addEventListener("click", (evt) => {
    denote = evt.target.closest("button").value;
    let page = document.querySelector(".symbol");
    page.style.opacity = "0";


    if(denote == "cross"){
        computerSign = "cross";
        code = '<i class="fa-solid fa-xmark"></i>';
    }
    else {
        computerSign = "circle";
        code = '<i class="fa-regular fa-circle"></i>';
    };

    setTimeout(function () {
        page.style.display = "none";
        let body = document.querySelector(".page");
        body.classList.remove(".load");
        body.style.display = "block";


        setTimeout(() => {
            body.style.opacity = "1";
        }, 100);


    }, 1000);
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