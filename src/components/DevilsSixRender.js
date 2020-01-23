import {Image, TouchableWithoutFeedback, View} from 'react-native';
import React, {Component} from 'react';
import {CardGameContext} from '../CardGameContext.js';
import {styles} from '../Styles.js';

export class DevilsSixRender extends Component {
    render(){
        let renderArray = [];
        for(let i = this.context.state.devilsSix.length; i > 0; i--){
       //     console.log(this.context.state.devilsSix[i - 1].id);
            renderArray.push(
                <TouchableWithoutFeedback key={this.context.state.devilsSix[i - 1].id} onPress={() => devilsSixHandler(this.context.state.devilsSix[i - 1].id, this.context.state.devilsSix, this.context.state, i)}>
                    <Image style={styles.cardStyleDevilsSix} source={this.context.state.devilsSix[i - 1].cardImage}/>
                </TouchableWithoutFeedback>
            )
        }
        return (
            <View style={{flex:1, flexDirection:"row"}}>
                {renderArray}
            </View>
        );
    }
}


function devilsSixHandler(selectedCard, selectedPile, context, index){
    context.updateCardSelectedType(2);
    context.updateCurrentlySelectedCard(selectedCard);
    context.updateCurrentlySelectedPile(selectedPile);
    context.updateCurrentlySelectedIndex(index);
}

DevilsSixRender.contextType = CardGameContext;
export default DevilsSixRender;
