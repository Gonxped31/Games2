const TYPES = ["Slave", "Peasant", "Emperor", "Used"];

export default class Deck{
    constructor(slaveOrEmp){
        var cards = decks(slaveOrEmp);
        this.cards = cards;
        return cards;
    }
}


export class Card{
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

function decks(slaveOrEmp){
    var cardS = new Card("Slave"), cardP = new Card("Peasant"), cardE = new Card("Emperor");
    var deckS = [cardP, cardP, cardS, cardP, cardP];
    var deckE = [cardP, cardP, cardE, cardP, cardP];
    if (slaveOrEmp === "Slave"){
        return deckS;
    } else {
        return deckE;
    }
    
}
