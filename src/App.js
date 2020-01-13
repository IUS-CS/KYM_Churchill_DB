/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  FlatList,
  TouchableHighlight,
  TouchableNativeFeedback,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';


import Deckbuilder from 'deckbuilder/deckbuilder.js';

const cards = require('./CardList.js');

const deckbuilder = new Deckbuilder({maxDeckSize: 104});
const PileData = React.createContext();
let pile1,pile2,pile3,pile4,pile5,pile6,pile7,pile8,pile9,pile10,devilsSix,victoryRow1,victoryRow2,victoryRow3,
    victoryRow4,victoryRow5,victoryRow6,victoryRow7,victoryRow8,activeCard,activePile,activeContext,activeIndex,cardIndex;

let devilsSixSelected = false;
let emptyPileKey = 0;
let victoryRowKey = 0;

deckbuilder.add(cards.cardList);

let pilesArr = prepareGame();

const App: () => React$Node = () => {
  return (
      <MainScreen/>
  );
};

class MainScreen extends Component {
  state = {
    piles: pilesArr,
    updatePiles: (index, newArr) => {
      pilesArr = this.state.piles;
      pilesArr[index] = newArr;
      this.setState({
        piles: pilesArr
      })
    }
  };
  render(){
    return(
        <PileData.Provider value={this.state}>
          <View style={{marginTop:10}}>
            <View style={{flexDirection:'row'}}>
              <DeckRender/>
              <View style={{flexDirection:'row', marginBottom:100}}>
                <DevilsSixRender data={devilsSix}/>
              </View>
              <View style={{flex:1, flexDirection:'row', marginLeft:200}}>
                <VictoryRowRender data={victoryRow1} name={"Spade"}/>
                <VictoryRowRender data={victoryRow2} name={"Heart"}/>
                <VictoryRowRender data={victoryRow3} name={"Club"}/>
                <VictoryRowRender data={victoryRow4} name={"Diamond"}/>
                <VictoryRowRender data={victoryRow5} name={"Spade"}/>
                <VictoryRowRender data={victoryRow6} name={"Heart"}/>
                <VictoryRowRender data={victoryRow7} name={"Club"}/>
                <VictoryRowRender data={victoryRow8} name={"Diamond"}/>
              </View>
            </View>
            <View style={{marginTop: 100,flexDirection:'row'}}>
              <RenderPile data={0}/>
              <RenderPile data={1}/>
              <RenderPile data={2}/>
              <RenderPile data={3}/>
              <RenderPile data={4}/>
              <RenderPile data={5}/>
              <RenderPile data={6}/>
              <RenderPile data={7}/>
              <RenderPile data={8}/>
              <RenderPile data={9}/>
            </View>
          </View>
        </PileData.Provider>
    );
  }
}
const styles = StyleSheet.create({
  cardStylePiles: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    position:'absolute'
  },
  cardStyleDevilsSix: {
    width: 70,
    height: 70,
    marginRight: -50,
    resizeMode: 'contain'
  },
  cardStyleDeck: {
    width: 70,
    height: 70,
    resizeMode: 'contain'
  },
  cardStyleVictoryRows: {
    width: 70,
    height: 70,
    resizeMode: 'contain'
  }
});

function prepareGame(){
  deckbuilder.shuffle(5);
  pile1 = deckbuilder.draw(1);
  pile2 = deckbuilder.draw(2);
  pile3 = deckbuilder.draw(3);
  pile4 = deckbuilder.draw(4);
  pile5 = deckbuilder.draw(5);
  pile6 = deckbuilder.draw(5);
  pile7 = deckbuilder.draw(4);
  pile8 = deckbuilder.draw(3);
  pile9 = deckbuilder.draw(2);
  pile10 = deckbuilder.draw(1);
  [pile2,pile3,pile4,pile5,pile6,pile7,pile8,pile9].forEach(flipInitial);
  let pilesArr =[pile1,pile2,pile3,pile4,pile5,pile6,pile7,pile8,pile9,pile10];
  devilsSix = deckbuilder.draw(6);
  return pilesArr;
}

function flipInitial(pile){
  for(let i = pile.length; i > 1; i--){
    pile[i - 1].visible = false;
  }
}

class RenderPile extends Component {
  state = {
    pile: this.context.piles
  };
  render(){
    let renderArray = [];
    let pileIndex = this.props.data;
    if(this.state.pile[pileIndex].length !== 0) {
      for (let i = this.state.pile[pileIndex].length; i > 0; i--) {
        if (this.state.pile[pileIndex][i - 1].visible) {
          renderArray.push(
                    <TouchableWithoutFeedback key={this.state.pile[pileIndex][i - 1].id}
                                              onPress={() => cardActionHandler(this.state.pile[pileIndex][i - 1].id, this.state.pile[pileIndex], this.context, pileIndex)}>
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
                     style={[styles.cardStylePiles, {zIndex: i, marginTop: (i + (5 - this.state.pile[pileIndex].length)) * -20}]}
                     source={require('./assets/PNG-cards-1.3/black_joker.png')}/>
          )
        }
      }
    }else{
      renderArray.push(
          <TouchableWithoutFeedback key={'EmptyPile' + emptyPileKey}
                                    onPress={() => emptyPileHandler(this.state.pile[pileIndex], this.context, pileIndex)}>
            <Image style={[styles.cardStylePiles, {zIndex: 0, marginTop: -100}]}
                   source={require('./assets/PNG-cards-1.3/red_joker.png')}/>
          </TouchableWithoutFeedback>
      );
      emptyPileKey++;
    }
    return (
        <View style={{flex:1}}>
          {renderArray}
        </View>
    );
  }
}
RenderPile.contextType = PileData;

function cardActionHandler(selectedCard, selectedPile, context, index){
  if(devilsSixSelected){
    cleanUp();
    return;
  }
  if(activeCard == null){
    activeCard = selectedCard;
    activePile = selectedPile;
    activeContext = context;
    activeIndex = index;
  }else{
    let tempArr = [];
    let i = 0;
    while(true){
      if(activePile[i].id === activeCard){
        let correctSuit = (activePile[i].suitColor === "Red" && selectedPile[0].suitColor === "Black") || (activePile[i].suitColor === "Black" && selectedPile[0].suitColor === "Red");
        if((selectedPile[0].rank === activePile[i].rank + 1) && correctSuit) {
          tempArr = activePile.splice(0, i + 1);
          tempArr = tempArr.concat(selectedPile);
          context.updatePiles(index, tempArr);
          if(activePile.length !== 0) {
            if (!activePile[0].visible) {
              activePile[0].visible = true;
            }
          }
          activeContext.updatePiles(activeIndex, activePile);
        }
        cleanUp();
        break;
      }
      i++;
    }
  }
}

function emptyPileHandler (selectedPile, context, index) {
  if(devilsSixSelected){
    cleanUp();
    return;
  }
  if (activeCard != null && activeCard.includes("King")) {
    let tempArr = [];
    let i = 0;
    while (true) {
      if (activePile[i].id === activeCard) {
        tempArr = activePile.splice(0, i + 1);
        tempArr = tempArr.concat(selectedPile);
        selectedPile = tempArr;

        context.updatePiles(index, tempArr);
        if (activePile.length !== 0) {
          if (!activePile[0].visible) {
            activePile[0].visible = true;
          }
        }
        activeContext.updatePiles(activeIndex, activePile);
        cleanUp();
        break;
      }
      i++;
    }
  }
}

function victoryRowHandler(suit, selectedPile, context){
  if (activeCard != null) {
    if(activeCard.includes(suit) && !devilsSixSelected) {
      if(selectedPile == null && activePile[0].rank === 1) {
        selectedPile = [];
        selectedPile.push(activePile.shift());
        context.setState({pile: selectedPile});
        if (activePile.length !== 0) {
          if (!activePile[0].visible) {
            activePile[0].visible = true;
          }
        }
        activeContext.updatePiles(activeIndex, activePile);
      }else if(selectedPile != null && activePile[0].rank - selectedPile[selectedPile.length - 1].rank === 1){
        selectedPile.push(activePile.shift());
        context.setState({pile: selectedPile});
        if (activePile.length !== 0) {
          if (!activePile[0].visible) {
            activePile[0].visible = true;
          }
        }
        activeContext.updatePiles(activeIndex, activePile);
      }
    }else if(activeCard.includes(suit) && devilsSixSelected){
      if(selectedPile == null && activePile[cardIndex - 1].rank === 1) {
        selectedPile = activePile.splice(cardIndex - 1, 1);
        context.setState({pile: selectedPile});
        activeContext.setState({pile: activePile});
      }else if(selectedPile != null && activePile[cardIndex - 1].rank - selectedPile[selectedPile.length - 1].rank === 1){
        selectedPile.push(activePile.splice(cardIndex - 1, 1));
        context.setState({pile: selectedPile.flat()});
        activeContext.setState({pile: activePile});
      }
    }
    cleanUp();
  }
}

function devilsSixHandler(selectedCard, selectedPile, context, index){
    devilsSixSelected = true;
    activeCard = selectedCard;
    activePile = selectedPile;
    activeContext = context;
    cardIndex = index;
}

function deckHandler(cards){
  let tempArr;
  for(let i = 0; i < 10; i++){
    console.log(cards.piles[i]);
    if(cards.piles[i].length === 0){
      tempArr = [];
      tempArr.push(deckbuilder.draw(1)[0]);
      cards.updatePiles(i,tempArr)
    }else if(cards.piles[i][0].rank !== 13){
      tempArr = cards.piles[i];
      tempArr.unshift(deckbuilder.draw(1)[0]);
      cards.updatePiles(i,tempArr)
    }
  }
}

function cleanUp(){
  activeCard = null;
  activePile = null;
  activeContext = null;
  activeIndex = null;
  devilsSixSelected = false;
  cardIndex = null;
}


class DeckRender extends Component{
  render() {
    return (
        <PileData.Consumer>
          {value =>
              <View style={{marginRight: 35}}>
                <TouchableWithoutFeedback key={"DeckButton"} onPress={() => deckHandler(value)}>
                  <Image style={styles.cardStyleDevilsSix} source={require('./assets/PNG-cards-1.3/black_joker.png')}/>
                </TouchableWithoutFeedback>
              </View>
          }
        </PileData.Consumer>
    );
  }
}

class DevilsSixRender extends Component {
  state = {
    pile: this.props.data
  };
  render(){
    let renderArray = [];

    for(let i = this.state.pile.length; i > 0; i--){
        renderArray.push(
            <TouchableWithoutFeedback key={this.state.pile[i - 1].id} onPress={() => devilsSixHandler(this.state.pile[i - 1].id, this.state.pile, this, i)}>
              <Image style={styles.cardStyleDevilsSix} source={this.state.pile[i - 1].cardImage}/>
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

class VictoryRowRender extends Component {
  state = {
    pile: this.props.data
  };
  render(){
    let renderArray = [];
    if(this.state.pile == null) {
      renderArray.push(
          <TouchableWithoutFeedback key={'Empty' + victoryRowKey} onPress={() => victoryRowHandler(this.props.name, this.state.pile, this)}>
            <Image style={styles.cardStyleVictoryRows} source={require('./assets/PNG-cards-1.3/red_joker.png')}/>
          </TouchableWithoutFeedback>
      );
      victoryRowKey++;
    }else{
      renderArray.push(
          <TouchableWithoutFeedback key={this.state.pile[this.state.pile.length - 1].id} onPress={() => victoryRowHandler(this.props.name, this.state.pile, this)}>
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

export default App;
