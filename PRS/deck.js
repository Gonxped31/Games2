const TYPES = ["Rock", "Paper", "Scissors"];

export default class Deck{
    constructor(){
        let cards = decks();
        this.cards = cards;
        return cards;
    }
}


class Card{
    constructor(type){
        this.type = type;
    }

    getHTML() {
        const cardDIV = document.createElement('div');
        cardDIV.innerText = this.type;
        cardDIV.classList.add("card");
        cardDIV.onclick();
        return cardDIV;
    }

}

function fisherMixing(array) {
    let variable;
    for (let i = array.length - 1; i > 1; i--){
        let j = getRandomInt(i);
        variable = array[i];
        array[i] = array[j];
        array[j] = variable;
    }
    return array;
}

function decks(){
    let cardR = new Card("Rock"), cardP = new Card("Paper"), cardS = new Card("Scissors");

    let deck = [cardR, cardR, cardR, cardP, cardP, cardP, cardS, cardS, cardS];

    return fisherMixing(deck);
    
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
