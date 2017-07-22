import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator
} from 'react-native';
import GameBoard from '../containers/GameBoard';


export default TicTacTuring = ({gameDone, won}) => {

  return (
    <View>
      <GameBoard/>
      <View>
      {

          gameDone && won ? <Text>WINNER</Text> : <Text>LOSER</Text>


      }
      </View>
    </View>
  )

}
