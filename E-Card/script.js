import Deck from "./deck.js";

// Create the image path : images/imageName.jpg
function imagesSrc(imgType) {
    return 'images/' + imgType + '.jpg';
}

// HTML image
function createImages(source, height, width){
    return '<img src="' + source + '" height="' + height + '" width="' + width + '">';
}

let height = 157;
let width = 109;

const peasantImg = createImages(imagesSrc("Citizen"), height, width);
const emperorImg = createImages(imagesSrc("Emperor2"), height, width);
const slaveImg = createImages(imagesSrc("Slave2"), height, width);
const backCard = createImages(imagesSrc("BackCard"), height, width);

const computerSlots = document.querySelectorAll(".computer-card-slot");

const playerSlots = document.querySelectorAll(".player-card-slot");


const computerCardSetElement = document.querySelector(".computer-card-set");
const playerCardSetElement = document.querySelector(".player-card-set");
const text = document.querySelector(".text");

let playerSlot, computerSlot, status;

function clickListener(n) {
	return function() {
		if (status === "play") {
			movePlayerCardsToSet(n);
			moveComputerCardsToSet();
			isWinner();
		} else if (status === "continue") {
			cleanBoard();
		} else if (status === "stop") {
            fullCleanBoard();
			startGame();
		}
	};
}

for (let i = 0; i < playerSlots.length; ++i) {
    playerSlots[i].addEventListener("click", clickListener(i));
}

function continueGame(){
	status = "continue";
}

function stopGame(){
	status = "stop";
}

startGame();
function startGame(){
	status = "play";
    let randInt = getRandomInt(2);
    if (randInt == 0){
        playerSlot = new Deck("Slave2");
        computerSlot = new Deck("Emperor2");
        randInt = 1;
    } else {
        playerSlot = new Deck("Emperor2");
        computerSlot = new Deck("Slave2");
        randInt = 0;
    }
    
    displayCards();
}

// Clean the sets spaces and the win/lose message
function cleanBoard(){
	status = "play";
    computerCardSetElement.innerHTML = "";
    playerCardSetElement.innerHTML = "";
    text.innerHTML = "";
}

// Clean all elements in the board
function fullCleanBoard(){
	status = "play";
    for (let elem of computerSlots) {
        elem.innerHTML = "";
    }

    for (let elem of playerSlots) {
        elem.innerHTML = "";
    }

    computerCardSetElement.innerHTML = "";
    playerCardSetElement.innerHTML = "";
    text.innerHTML = "";
}

// Display player the cards
function displayCards() {

    for (let i = 0; i < playerSlots.length; ++i) {
        playerSlots[i].innerHTML = createImages(imagesSrc(playerSlot[i].type), height, width);
    }

    for (let compCards of computerSlots) {
        compCards.innerHTML = backCard;
    }

}

function movePlayerCardsToSet(cardIndex) {

    playerCardSetElement.innerHTML = createImages(imagesSrc(playerSlot[cardIndex].type), height, width);
    setCardToNull(playerSlot, cardIndex);

    for (let i = 0; i < playerSlots.length; ++i) {
        if (cardIndex === i) {
            playerSlots[i].innerHTML = "";
        }
    }
}

function chooseCard(slots) {

    let goodCards = nbOfgoodCards(slots);

    let selection = getRandomInt(goodCards);

    for (let index = 0; index < slots.length; index++) {
        if (slots[index] !== null) {
            if (selection === 0) {
                return index;
            }
            selection--;
        }
    }
}

function setCardToNull(slots, index) {
    slots[index] = null;
}

function moveComputerCardsToSet() {

    let index = chooseCard(computerSlot);
    computerCardSetElement.innerHTML = createImages(imagesSrc(computerSlot[index].type), height, width);
    setCardToNull(computerSlot, index);

    for (let i = 0; i < computerSlots.length; ++i) {
        if (index === i) {
            computerSlots[i].innerHTML = "";
        }
    }
}

function isWinner(){

    const playerCard = playerCardSetElement.innerHTML;
    const computerCard = computerCardSetElement.innerHTML;

    if (playerCard === computerCard) {
        text.innerText = "Draw";
        console.log(text.innerText)
        continueGame();
    }

    else if (playerCard === slaveImg) {
        if (computerCard === emperorImg) {
            text.innerText = "Won";
            stopGame();
        } else {
            text.innerText = "Lost";
            stopGame();
        }
    }

    else if (playerCard === emperorImg) {
        if (computerCard === slaveImg) {
            text.innerText = "Lost";
            stopGame();
        } else {
            text.innerText = "Won";
            stopGame();
        }
    }

    else if (playerCard === peasantImg) {
        if (computerCard === emperorImg) {
            text.innerText = "Lost";
            stopGame();
        } else {
            text.innerText = "Won";
            stopGame();
        }
    }

}

function nbOfgoodCards(slots) {
    let count = 0;
    for (let elem of slots) {
        if (elem !== null) {
            count ++
        }
    }
    return count
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

