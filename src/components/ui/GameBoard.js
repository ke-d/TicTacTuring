import React, {Component} from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import Cross from './TicTacTuringComp/Cross';
import Circle from './TicTacTuringComp/Circle';

// The center points of each 'square' box on the game board
export const CENTER_POINTS = [
  { x: 10, y:10 },
  { x: 113, y:10 },
  { x: 213, y:10 },
  { x: 10, y:113 },
  { x: 113, y:113 },
  { x: 213, y:113 },
  { x: 10, y:213 },
  { x: 113, y:213 },
  { x: 213, y:213 },
];


export default class GameBoard extends Component {

  constructor(props) {
    super(props);
  }

  // Redux store controls the state of the game and will get passed into this UI
  componentWillReceiveProps(nextProps) {
    const { navIndex, resetGame, submitGame, gameDone, won } = nextProps;
    const gameOver = this.props.gameDone === false && gameDone === true;

    if(gameOver) {
      submitGame(won);
    }
    if(this.props.navIndex > navIndex) {
      resetGame();
    }

  }

  render() {
    const { aiInputs, userInputs, onUserAction } = this.props;
    return (
      <View style={styles.container}>
      <TouchableWithoutFeedback onPress={e => onUserAction(e)}>

        <View style={styles.board}>

          <View style={[styles.lineX, {
            transform: [
              {translateY: 100}
            ]
          }]} />

          <View style={[styles.lineX, {
            transform: [
              {translateY: 200}
            ]
          }]} />

          <View style={[styles.lineY, {
            transform: [
              {translateX: 100}
            ]
          }]} />

          <View style={[styles.lineY, {
            transform: [
              {translateX: 200}
            ]
          }]} />

          {
            // Automatically map the correct amount of Circles to each point on screen
            userInputs.map((d, i) => (
              <Circle
                key={i}
                xTranslate={CENTER_POINTS[d].x}
                yTranslate={CENTER_POINTS[d].y}
                color='deepskyblue'
              />
            ))
          }
          {
            // Automatically map the correct amount of Crosses to each point on screen
            aiInputs.map((d, i) => (
              <Cross
                key={i}
                xTranslate={CENTER_POINTS[d].x}
                yTranslate={CENTER_POINTS[d].y}
              />
            ))
          }

        </View>

        </TouchableWithoutFeedback>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 20
  },
  board: {
    borderWidth: 3,
    height: 312,
    width: 312
  },
  lineX: {
    backgroundColor: '#000',
    height: 3,
    width: 306,
    position: 'absolute'
  },
  lineY: {
    backgroundColor: '#000',
    height: 306,
    width: 3,
    position: 'absolute'
  }
})
