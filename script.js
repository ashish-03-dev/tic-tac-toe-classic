let clickedNodes = document.querySelectorAll(".box");


clickedNodes.forEach((node) => {
    node.onclick = () => {
        if (!node.querySelector(".circle")){
            let correct = document.createElement("div");
            correct.classList.add("circle");
            node.appendChild(correct);
        }
    }
}
);
// let str ="<i class="fa-solid fa-xmark"></i>";