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
            }, 100)
            console.log("block");
        }, 1000);
    }, 1000)
});


let sign;

let selected = document.querySelector(".choose");
selected.addEventListener('click', (evt) => {
    sign = evt.target.value;
    let page = document.querySelector(".symbol");
    page.style.opacity = "0";
    setTimeout(function () {
        page.style.display="none";
        let body = document.querySelector(".page");
        body.classList.remove(".load");
        body.style.display="block";
        setTimeout(()=>{
            body.style.opacity="1";
        },100)
    }, 1000);
})


let clickedNodes = document.querySelectorAll(".box");


clickedNodes.forEach((node) => {
    node.onclick = () => {
        if (!node.querySelector(".circle")) {
            let correct = document.createElement("div");
            correct.classList.add("circle");
            node.appendChild(correct);
        }
    }
}
);
// let str ="<i class="fa-solid fa-xmark"></i>";