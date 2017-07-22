import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator
} from 'react-native';
import GameBoard from '../containers/GameBoard';


export default TicTacTuring = ({gameDone, won, onResetGame}) => {
  let textWinner = won ? "YOU WIN!" : "YOU LOSE!";

  return (
    <View style={styles.container}>
      <GameBoard/>
      <View>
      {gameDone && textWinner &&
        <Button title={`${textWinner} Play Again?`} onPress={() => onResetGame()} />
      }
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
