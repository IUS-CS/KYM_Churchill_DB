import {Image, TouchableWithoutFeedback, View} from 'react-native';
import React, {Component} from 'react';
import {CardGameContext} from '../CardGameContext.js';
import {styles} from '../Styles.js';

export class VictoryRowRender extends Component {
    state = {
        pile: null
    };
    render(){
        let renderArray = [];
        let gameContext = this.context.state;
        let displayType = "";

        if(this.state.pile == null) {
            switch(this.props.name){
                case "Spade": displayType = require("../assets/VictoryRowAssets/victory-row-spade.png");
                    break;
                case "Heart": displayType = require("../assets/VictoryRowAssets/victory-row-heart.png");
                    break;
                case "Club": displayType = require("../assets/VictoryRowAssets/victory-row-club.png");
                    break;
                case "Diamond": displayType = require("../assets/VictoryRowAssets/victory-row-diamond.png");
            }
            renderArray.push(
                <TouchableWithoutFeedback key={'VictoryEmpty' + gameContext.keyCounter} onPress={() => victoryRowHandler(this.props.name, this.state.pile, this.context.state, this)}>
                    <Image style={styles.cardStyleVictoryRows} source={displayType}/>
                </TouchableWithoutFeedback>
            );
            gameContext.updateKeyCounter();
        }else{
            console.log(this.state.pile);
            renderArray.push(
                <TouchableWithoutFeedback key={this.state.pile[this.state.pile.length - 1].id} onPress={() => victoryRowHandler(this.props.name, this.state.pile, this.context.state, this)}>
                    <Image style={styles.cardStyleVictoryRows} source={this.state.pile[this.state.pile.length - 1].cardImage}/>
                </TouchableWithoutFeedback>
            );
        }
        return (
            <View style={{flex:1}}>
                {renderArray}
            </View>
        );
    }
}

function victoryRowHandler(suit, selectedPile, context, contextVRR){
    if (context.currentlySelectedCard != null) {
        if(context.currentlySelectedCard.includes(suit) && context.cardSelectedType !== 2) {
            if(selectedPile == null && context.currentlySelectedPile[0].rank === 1) {
                selectedPile = [];
                selectedPile.push(context.currentlySelectedPile.shift());
                contextVRR.setState({pile: selectedPile});
                if (context.currentlySelectedPile.length !== 0) {
                    if (!context.currentlySelectedPile[0].visible) {
                        context.currentlySelectedPile[0].visible = true;
                    }
                }
                context.updatePiles(context.currentlySelectedIndex, context.currentlySelectedPile);
            }else if(selectedPile != null && context.currentlySelectedPile[0].rank - selectedPile[selectedPile.length - 1].rank === 1){
                selectedPile.push(context.currentlySelectedPile.shift());
                contextVRR.setState({pile: selectedPile});
                if (context.currentlySelectedPile.length !== 0) {
                    if (!context.currentlySelectedPile[0].visible) {
                        context.currentlySelectedPile[0].visible = true;
                    }
                }
                context.updatePiles(context.currentlySelectedIndex, context.currentlySelectedPile);
            }
        }else if(context.currentlySelectedCard.includes(suit) && context.cardSelectedType === 2){
            if(selectedPile == null && context.currentlySelectedPile[context.currentlySelectedIndex - 1].rank === 1) {
                selectedPile = context.currentlySelectedPile.splice(context.currentlySelectedIndex - 1, 1);
                context.updateDevilsSix(context.currentlySelectedPile);
                contextVRR.setState({pile: selectedPile});
            }else if(selectedPile != null && context.currentlySelectedPile[context.currentlySelectedIndex - 1].rank - selectedPile[selectedPile.length - 1].rank === 1){
                selectedPile.push(context.currentlySelectedPile.splice(context.currentlySelectedIndex - 1, 1));
                context.updateDevilsSix(context.currentlySelectedPile);
                contextVRR.setState({pile: selectedPile.flat()});
            }
        }
        context.cleanUp();
    }
}

VictoryRowRender.contextType = CardGameContext;
export default VictoryRowRender;
