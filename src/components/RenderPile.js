import {Image, TouchableWithoutFeedback, View} from 'react-native';
import React, {Component} from 'react';
import {CardGameContext} from '../CardGameContext.js';
import {styles} from '../Styles.js';

export class RenderPile extends Component {
    state = {
        pile: this.context.state.piles
    };
    render(){
        let renderArray = [];
        let pileIndex = this.props.data;
        if(this.state.pile[pileIndex].length !== 0) {
            for (let i = this.state.pile[pileIndex].length; i > 0; i--) {
                if (this.state.pile[pileIndex][i - 1].visible) {
                    renderArray.push(
                        <TouchableWithoutFeedback key={this.state.pile[pileIndex][i - 1].id}
                                                  onPress={() => cardActionHandler(this.state.pile[pileIndex][i - 1].id, this.state.pile[pileIndex], this.context.state, pileIndex)}>
                            <Image style={[styles.cardStylePiles, {
                                zIndex: i,
                                marginTop: (i + (5 - this.state.pile[pileIndex].length)) * -20
                            }]}
                                   source={this.state.pile[pileIndex][i - 1].cardImage}/>
                        </TouchableWithoutFeedback>
                    )
                } else {
                    renderArray.push(
                        <Image key={this.state.pile[pileIndex][i - 1].id}
                               style={[styles.cardStylePiles, {zIndex: i, marginTop: (i + (5 - this.state.pile[pileIndex].length)) * -20}]} source={require("../assets/CardBack/Card_back_06.png")}/>
                    )
                }
            }
        }else{
            renderArray.push(
                <TouchableWithoutFeedback key={'EmptyPile' + this.context.state.keyCounter}
                                          onPress={() => emptyPileHandler(this.state.pile[pileIndex], this.context.state, pileIndex)}>
                    <Image style={[styles.cardStylePiles, {zIndex: 0, marginTop: -100}]} source={require("../assets/EmptyPileArt/empty-pile.png")}/>
                </TouchableWithoutFeedback>
            );
            this.context.state.updateKeyCounter();
        }
        return (
            <View style={{flex:1}}>
                {renderArray}
            </View>
        );
    }
}

function cardActionHandler(selectedCard, selectedPile, context, index){
    console.log(context.cardSelectedType);
    if(context.cardSelectedType === 2){
        context.cleanUp();
        return;
    }
    if(context.cardSelectedType === 0){
        context.updateCardSelectedType(1);
        context.updateCurrentlySelectedCard(selectedCard);
        context.updateCurrentlySelectedPile(selectedPile);
        context.updateCurrentlySelectedIndex(index);
    }else{
        let tempArr = [];
        let i = 0;
        while(true){
            if(context.currentlySelectedPile[i].id === context.currentlySelectedCard){
                let correctSuit = (context.currentlySelectedPile[i].suitColor === "Red" && selectedPile[0].suitColor === "Black") || (context.currentlySelectedPile[i].suitColor === "Black" && selectedPile[0].suitColor === "Red");
                if((selectedPile[0].rank === context.currentlySelectedPile[i].rank + 1) && correctSuit) {
                    tempArr = context.currentlySelectedPile.splice(0, i + 1);
                    tempArr = tempArr.concat(selectedPile);
                    context.updatePiles(index, tempArr);
                    if(context.currentlySelectedPile.length !== 0) {
                        if (!context.currentlySelectedPile[0].visible) {
                            context.currentlySelectedPile[0].visible = true;
                        }
                    }
                    context.updatePiles(context.currentlySelectedIndex, context.currentlySelectedPile);
                }
                context.cleanUp();
                break;
            }
            i++;
        }
    }
}

function emptyPileHandler (selectedPile, context, index) {
    if(context.cardSelectedType === 2){
        context.cleanUp();
        return;
    }
    if (context.currentlySelectedCard != null && context.currentlySelectedCard.includes("King")) {
        let tempArr = [];
        let i = 0;
        while (true) {
            if (context.currentlySelectedPile[i].id === context.currentlySelectedCard) {
                tempArr = context.currentlySelectedPile.splice(0, i + 1);
                tempArr = tempArr.concat(selectedPile);
                selectedPile = tempArr;

                context.updatePiles(index, tempArr);
                if (context.currentlySelectedPile.length !== 0) {
                    if (!context.currentlySelectedPile[0].visible) {
                        context.currentlySelectedPile[0].visible = true;
                    }
                }
                context.updatePiles(context.currentlySelectedIndex, context.currentlySelectedPile);
                context.cleanUp();
                break;
            }
            i++;
        }
    }
}

RenderPile.contextType = CardGameContext;
export default RenderPile;
