import {Image, TouchableWithoutFeedback, View} from 'react-native';
import React, {Component} from 'react';
import {CardGameContext} from '../CardGameContext.js';
import {styles} from '../Styles.js';

class DeckRender extends Component{
    state = {
        deckEmpty: false
    };
    render(){
        let deckContext = this.context.state;
        let renderArr = [];
        if(this.state.deckEmpty){
            renderArr.push(
                    <TouchableWithoutFeedback key={"DeckButton"}>
                        <Image style={styles.cardStyleDevilsSix} source={require("../assets/EmptyPileArt/empty-pile.png")}/>
                    </TouchableWithoutFeedback>
            )
        }else{
            renderArr.push(
                    <TouchableWithoutFeedback key={"DeckButton"} onPress={() => deckHandler(deckContext, this)}>
                        <Image style={styles.cardStyleDevilsSix} source={require("../assets/CardBack/Card_back_06.png")}/>
                    </TouchableWithoutFeedback>
            )
        }
        return(
        <View style={{marginRight: 35}}>
            {renderArr}
        </View>)
    }
}

function deckHandler(context, deckState){
    let tempArr;
    console.log(context.deckBuilder.deck.length);
    if(context.deckBuilder.deck.length > 10 ) {
        for (let i = 0; i < 10; i++) {
            if (context.piles[i].length === 0) {
                tempArr = [];
                tempArr.push(context.deckBuilder.draw(1)[0]);
                context.updatePiles(i, tempArr)
            } else if (context.piles[i][0].rank !== 13) {
                tempArr = context.piles[i];
                tempArr.unshift(context.deckBuilder.draw(1)[0]);
                context.updatePiles(i, tempArr)
            }
        }
    }else {
        for (let i = 0; i < 10; i++) {
            if (context.piles[i].length === 0 && context.deckBuilder.length > 0) {
                tempArr = [];
                tempArr.push(context.deckBuilder.draw(1)[0]);
                context.updatePiles(i, tempArr)
            } else if (context.piles[i][0].rank !== 13 && context.deckBuilder.length > 0) {
                tempArr = context.piles[i];
                tempArr.unshift(context.deckBuilder.draw(1)[0]);
                context.updatePiles(i, tempArr)
            }
        }
        deckState.setState({deckEmpty: true});
    }
    context.cleanUp();
}

DeckRender.contextType = CardGameContext;
export default DeckRender;
