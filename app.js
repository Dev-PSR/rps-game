import JSConfetti from 'https://cdn.skypack.dev/js-confetti';

const jsConfetti = new JSConfetti();

let choices = document.querySelectorAll(".choice");
let currMove = document.querySelector(".currMove");
let yourScore = document.querySelector("#yourScore");
let compScore = document.querySelector("#compScore");
let content = document.querySelector(".content");
let popup = document.querySelector(".popup");
let popupContent = document.querySelector(".popup-text");
let popupButton = document.querySelector(".popup-button");

popupButton.addEventListener("click", () => {
    popup.classList.add("hidden");
    content.classList.remove("freeze");
    resetGame();
})

const getComputerChoice = () => {
    // 0 is rock, 1 is paper, 2 is scissors
    return Math.floor(Math.random() * 3);
}

const winnerConfetti = () => {
    jsConfetti.addConfetti({
        emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
    })
}

const loserConfetti = () => {
    jsConfetti.addConfetti({
        emojis: ['🤣', '🫵', '🫵🏿', '😂', '😹'],
    });
}
const resetGame = () => {
    yourScore.textContent = 0;
    compScore.textContent = 0;
    currMove.innerText = "Pick a move"
    popupContent.innerText = "";
}

const showPopup = () => {
    content.classList.add('freeze');
    popup.classList.remove('hidden');
}

const popupLogic = () => {
    if (parseInt(yourScore.innerText) === 5) {
        popupContent.innerText = "You won the game! You aren't completely trash!!!";
        showPopup();
        winnerConfetti();
    }
    else if (parseInt(compScore.innerText) === 5) {
        popupContent.innerText = "You lost the game! You are completely trash!!!";
        showPopup();
        loserConfetti();
    }
}

choices.forEach((choice, index) => {
    choice.addEventListener("click", () => {
        let user = index;
        let computer = getComputerChoice();
        let computerChoice = choices[computer].id;
        if (user === computer) {
            currMove.innerText = `It is a tie! Computer chose ${computerChoice}`;
        }
        else if (user === 0 && computer === 2 ||
            user === 1 && computer === 0 ||
            user === 2 && computer === 1)
        {
            currMove.innerText = `You Won! Computer chose ${computerChoice}`;
            yourScore.innerText = parseInt(yourScore.innerText) + 1;
        }
        else {
            currMove.innerText = `You Lost! Computer chose ${computerChoice}`;
            compScore.innerText = parseInt(compScore.innerText) + 1;
        }
        popupLogic();
        
    })
})
