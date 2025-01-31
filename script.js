let clickedNodes = document.querySelectorAll(".box");

clickedNodes.forEach((node) => {
    node.onclick = () => {
        if (!node.querySelector(".circle")){
            let clicked = document.createElement("div");
            clicked.classList.add("circle");
            node.appendChild(clicked);
        }
    }
}
);