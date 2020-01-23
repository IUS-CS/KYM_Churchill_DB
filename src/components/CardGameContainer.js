import React, {Component} from 'react';
import Deckbuilder from 'deckbuilder/deckbuilder.js';
import {CardGameContext} from '../CardGameContext.js';
let pile1,pile2,pile3,pile4,pile5,pile6,pile7,pile8,pile9,pile10,devilsSix;



const cards = require('../CardList.js');
const deckBuilder = new Deckbuilder({maxDeckSize: 104});
deckBuilder.add(cards.cardList);

let pilesArr = prepareGame();

export class CardGameContainer extends Component{
    state = {
        deckBuilder: deckBuilder,
        piles: pilesArr,
        keyCounter: 0,
        devilsSix: devilsSix,
        //CardSelectedType corresponds to which type of card was chosen, 0 = none, 1 = (RenderPile), 2 = (DevilsSixRender)
        cardSelectedType: 0,
        currentlySelectedCard: "",
        currentlySelectedPile: [],
        currentlySelectedIndex: null,
        updatePiles: (index, newArr) => {
            pilesArr = this.state.piles;
            pilesArr[index] = newArr;
            this.setState({
                piles: pilesArr
            })
        },
        updateDevilsSix: (newArr) => {
            this.setState({
                devilsSix: newArr
            })
        },
        updateKeyCounter: () => {this.state.keyCounter = this.state.keyCounter + 1},
        updateCardSelectedType: (number) => {this.state.cardSelectedType = number},
        updateCurrentlySelectedCard: (card) => {this.state.currentlySelectedCard = card},
        updateCurrentlySelectedPile: (pile) => {this.state.currentlySelectedPile = pile},
        updateCurrentlySelectedIndex: (index) => {this.state.currentlySelectedIndex = index},
        cleanUp: () => {this.state.cardSelectedType = 0; this.state.currentlySelectedCard = ""; this.state.currentlySelectedPile = []; this.state.currentSelectedIndex = null}
    };
    render(){
        return(
            <CardGameContext.Provider value={{state: this.state}}>{this.props.children}</CardGameContext.Provider>
        );
    };
}

function prepareGame(){
    deckBuilder.shuffle(5);
    pile1 = deckBuilder.draw(1);
    pile2 = deckBuilder.draw(2);
    pile3 = deckBuilder.draw(3);
    pile4 = deckBuilder.draw(4);
    pile5 = deckBuilder.draw(5);
    pile6 = deckBuilder.draw(5);
    pile7 = deckBuilder.draw(4);
    pile8 = deckBuilder.draw(3);
    pile9 = deckBuilder.draw(2);
    pile10 = deckBuilder.draw(1);
    [pile2,pile3,pile4,pile5,pile6,pile7,pile8,pile9].forEach(flipInitial);
    let pilesArr =[pile1,pile2,pile3,pile4,pile5,pile6,pile7,pile8,pile9,pile10];
    devilsSix = deckBuilder.draw(6);
    return pilesArr;
}

function flipInitial(pile){
    for(let i = pile.length; i > 1; i--){
        pile[i - 1].visible = false;
    }
}


