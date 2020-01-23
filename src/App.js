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

import RenderPile from "./components/RenderPile.js";
import DevilsSixRender from "./components/DevilsSixRender.js";
import VictoryRowRender from "./components/VictoryRowRender.js";
import DeckRender from "./components/DeckRender.js";
import {CardGameContainer} from './components/CardGameContainer';


const App: () => React$Node = () => {
  return (
      <CardGameContainer>
        <View style={{marginTop:10}}>
          <View style={{flexDirection:'row'}}>
            <DeckRender/>
            <View style={{flexDirection:'row', marginBottom:100}}>
              <DevilsSixRender />
            </View>
            <View style={{flex:1, flexDirection:'row', marginLeft:200}}>
              <VictoryRowRender name={"Spade"}/>
              <VictoryRowRender name={"Heart"}/>
              <VictoryRowRender name={"Club"}/>
              <VictoryRowRender name={"Diamond"}/>
              <VictoryRowRender name={"Spade"}/>
              <VictoryRowRender name={"Heart"}/>
              <VictoryRowRender name={"Club"}/>
              <VictoryRowRender name={"Diamond"}/>
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
      </CardGameContainer>
  );
};

export default App;
