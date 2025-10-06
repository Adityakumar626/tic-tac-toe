let boxes = document.querySelectorAll(".box");
let newGameBtn = document.querySelector("#new-btn");
let resetGameBtn = document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let game = document.querySelector(".game");

let Player1 = prompt("Enter Player 1 Name for O");
let Player2 = prompt("Enter Player 2 Name for X");

let turnO = true;
let count = 0;

if (Player1 == Player2 ) {
    alert("Enter Different Name");
}

const winPatterns = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left
    [2, 4, 6]
];

const resetGame = () => {
    enableBoxes();
    for (let box of boxes) {
    box.classList.remove("clicked");
    box.style.opacity = "0.6";}
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // console.log("box was clicked");
        if (turnO) {
            box.innerText = "O";
            turnO = false;
            box.style.color = "#ED3F27";
            box.style.opacity = "1";
            box.classList.add("clicked");
        } else {
            box.innerText = "X";
            turnO = true;
            box.style.opacity = "1";
            box.classList.add("clicked"); 
        }
        box.disabled = true;
        count++;
        checkWinner();
    })
})

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        msgContainer.classList.add("hide");
        turnO = true;
    }
}

const showWinner = (winner) => {
    let winnerName = winner === "O" ? Player1 : Player2;
    msg.innerText = `Congrats, Winner is ${winnerName}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const drawCon = () => {
    msg.innerText = `It's A Draw `;
    msgContainer.classList.remove("hide");
    disableBoxes();
}


const checkWinner = () => {
    for (let pattern of winPatterns) {
        // console.log(pattern[0],pattern[1],pattern[2]);
        // console.log(boxes[pattern[0]].innerText,boxes[pattern[1]].innerText,boxes[pattern[2]].innerText);
        let pos1Val = boxes[pattern[0]].innerText; // pso1Val is the content inside the box 
        let pos2Val = boxes[pattern[1]].innerText; // here pattern is giving the win pattern and patter[0] gives first element of the pattern
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("winner", pos1Val);
                showWinner(pos1Val);
                return;
            } else if (count === 9) {
                drawCon();
            }
        }
    }
}




resetGameBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);

