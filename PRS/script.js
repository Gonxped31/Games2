import Deck from "./deck.js";

let height = 158;
let width = 110;

let playerSlot, computerSlot, status, pStars, cStars;

const rockImg = createImages(imagesSrc("Rock"), height, width);
const paperImg = createImages(imagesSrc("Paper"), height, width);
const scissorImg = createImages(imagesSrc("Scissors"), height, width);
const backCard = createImages(imagesSrc("BackCard"), height, width);

const computerSlots = document.querySelectorAll(".computer-card-slot");
const computerCardSetElement = document.querySelector(".computer-card-set");
const computerStars = document.querySelector(".computerStars");

const playerSlots = document.querySelectorAll(".player-card-slot");
const playerStars = document.querySelector(".playerStars");
const playerCardSetElement = document.querySelector(".player-card-set");

const text = document.querySelector(".text");

function imagesSrc(imgType) {
    return 'images/' + imgType + '.jpg';
}

function createImages(source, height, width){
    return '<img src="' + source + '" height="' + height + '" width="' + width + '">';
}
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
    pStars = 3;
    cStars = 3;
    playerStars.innerHTML = "" + pStars;
    computerStars.innerHTML = "" + cStars;
    playerSlot = new Deck();
    computerSlot = new Deck();

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

function displayCards() {

    for (let i = 0; i < playerSlots.length; ++i) {
        playerSlots[i].innerHTML = createImages(imagesSrc(playerSlot[i].type), height, width);
    }

    for (let compCards of computerSlots) {
        compCards.innerHTML = backCard;
    }

}

// Use loop
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

    let goodCards = nbOfgoodCards(slots)
    
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
   slots[index] = null
}

//TODO and use loop
function moveComputerCardsToSet() {

    let index = chooseCard(computerSlot);
    computerCardSetElement.innerHTML = createImages(imagesSrc(computerSlot[index].type), height, width);
    setCardToNull(computerSlot, index)

    for (let i = 0; i < computerSlots.length; ++i) {
        if (index === i) {
            computerSlots[i].innerHTML = "";
        }
    }
}

// Done
function updateStars(incOrDec) {
    if (nbOfgoodCards(playerSlot) === 0) {
        stopGame()
    } else if (incOrDec === "inc"){
        pStars ++;
        cStars --;
        playerStars.innerHTML = pStars;
        computerStars.innerHTML = cStars;
        if (pStars > 0 && cStars > 0) {
            continueGame();
        } else{
            stopGame()
        }
    } else if (incOrDec === "dec"){
        pStars --;
        cStars ++;
        playerStars.innerHTML = pStars;
        computerStars.innerHTML = cStars;
        if (pStars > 0 && cStars > 0) {
            continueGame();
        } else{
            stopGame()
        }
    } else {
        playerStars.innerHTML = pStars;
        computerStars.innerHTML = cStars;
        continueGame();
    }
}


// Done
function isWinner(){

    const playerCard = playerCardSetElement.innerHTML;
    const computerCard = computerCardSetElement.innerHTML;
    

    if (playerCard === computerCard) {
        text.innerText = "Draw";
        updateStars("nothing");
    }

    else if (playerCard === rockImg) {
        if (computerCard === scissorImg) {
            text.innerText = "Won";
            updateStars("inc")
        } else {
            text.innerText = "Lost";
            updateStars("dec")
        }
    }

    else if (playerCard === paperImg) {
        if (computerCard === scissorImg) {
            text.innerText = "Lost";
            updateStars("dec")
        } else {
            text.innerText = "Won";
            updateStars("inc")
        }
    }

    else if (playerCard === scissorImg) {
        if (computerCard === rockImg) {
            text.innerText = "Lost";
            updateStars("dec")
        } else {
            text.innerText = "Won";
            updateStars("inc")
        }
    }

}

function nbOfgoodCards(slots) {
    let count = 0;
    for (let i = 0; i < slots.length; ++i) {
        if (slots[i] !== null) {
            count ++
        }
    } 
    return count
}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

