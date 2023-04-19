import Deck from "./deck - Copy";

function imagesSrc(imgType) {
    return 'images/' + imgType + '.jpg';
}

function createImages(source, height, width){
    return '<img src="' + source + '" height="' + height + '" width="' + width + '">';
}

let height = 157;
let width = 109;

const peasantImg = createImages(imagesSrc("Peasant"), height, width);
const emperorImg = createImages(imagesSrc("Emperor"), height, width);
const slaveImg = createImages(imagesSrc("Slave"), height, width);
const backCard = createImages(imagesSrc("BackCard"), height, width);

const computerCardSlot = document.querySelector(".computer-card-slot");
const playerCardSlot = document.querySelector(".player-card-slot");

//const computerSlots = Array.from(Array(5), (e, i) => document.querySelector(".computer-card-slot" + (i+1)));

//const playerSlots = Array.from(Array(5), (e, i) => document.querySelector(".player-card-slot" + (i+1)));

const computerCardSlot1 = document.querySelector(".computer-card-slot1");
const computerCardSlot2 = document.querySelector(".computer-card-slot2");
const computerCardSlot3 = document.querySelector(".computer-card-slot3");
const computerCardSlot4 = document.querySelector(".computer-card-slot4");
const computerCardSlot5 = document.querySelector(".computer-card-slot5");

const playerCardSlot1 = document.querySelector(".player-card-slot1");
const playerCardSlot2 = document.querySelector(".player-card-slot2");
const playerCardSlot3 = document.querySelector(".player-card-slot3");
const playerCardSlot4 = document.querySelector(".player-card-slot4");
const playerCardSlot5 = document.querySelector(".player-card-slot5");

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

playerCardSlot1.addEventListener("click", clickListener(0));
playerCardSlot2.addEventListener("click", clickListener(1));
playerCardSlot3.addEventListener("click", clickListener(2));
playerCardSlot4.addEventListener("click", clickListener(3));
playerCardSlot5.addEventListener("click", clickListener(4));

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
    if (randInt === 0){
        playerSlot = new Deck("Slave");
        computerSlot = new Deck("Emperor");
        randInt = 1;
    } else {
        playerSlot = new Deck("Emperor");
        computerSlot = new Deck("Slave");
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
    computerCardSlot.innerHTML = "";
    playerCardSlot.innerHTML = "";
    computerCardSetElement.innerHTML = "";
    playerCardSetElement.innerHTML = "";
    text.innerHTML = "";
}

// Display player the cards
function displayCards() {
    playerCardSlot1.innerHTML = createImages(imagesSrc(playerSlot[0].type), height, width);
    playerCardSlot2.innerHTML = createImages(imagesSrc(playerSlot[1].type), height, width);
    playerCardSlot3.innerHTML = createImages(imagesSrc(playerSlot[2].type), height, width);
    playerCardSlot4.innerHTML = createImages(imagesSrc(playerSlot[3].type), height, width);
    playerCardSlot5.innerHTML = createImages(imagesSrc(playerSlot[4].type), height, width);
    computerCardSlot1.innerHTML = backCard;
    computerCardSlot2.innerHTML = backCard;
    computerCardSlot3.innerHTML = backCard;
    computerCardSlot4.innerHTML = backCard;
    computerCardSlot5.innerHTML = backCard;    

}

function movePlayerCardsToSet(cardIndex) {
    playerCardSetElement.innerHTML = createImages(imagesSrc(playerSlot[cardIndex].type), height, width);
   if (cardIndex === 0){
        playerCardSlot1.innerHTML = "";
    } else if (cardIndex === 1){
        playerCardSlot2.innerHTML = "";
    } else if (cardIndex === 2){
        playerCardSlot3.innerHTML = "";
    } else if (cardIndex === 3){
        playerCardSlot4.innerHTML = "";
    } else if (cardIndex === 4){
        playerCardSlot5.innerHTML = "";
    }
  }

function chooseCard(slots) {
	let count = 0;
	for (let slot in slots) {
	  if (slot !== null) {
		count++;
	  }
	}

	let selection = Math.random(count);

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
    return slots[index] = null;
}

function moveComputerCardsToSet() {

    let index = chooseCard(computerSlot);
    computerCardSetElement.innerHTML = createImages(imagesSrc(computerSlot[index].type), height, width);
    setCardToNull(computerSlot, index);
    // use loops
    if (index === 0){
        computerCardSlot1.innerHTML = "";
    } else if (index === 1){
        computerCardSlot2.innerHTML = "";
    } else if (index === 2){
        computerCardSlot3.innerHTML = "";
    } else if (index === 3){
        computerCardSlot4.innerHTML = "";
    } else if (index === 4){
        computerCardSlot5.innerHTML = "";
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

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

