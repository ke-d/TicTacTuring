import React, {Component} from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import Cross from './TicTacTuringComp/Cross';
import Circle from './TicTacTuringComp/Circle';

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
]

export const AREAS = [
  { startX: 3, startY: 3, endX : 103, endY: 103, id: 0 },
  { startX: 106, startY: 3, endX : 206, endY: 103, id: 1 },
  { startX: 209, startY: 3, endX : 309, endY: 103, id: 2 },
  { startX: 3, startY: 106, endX : 103, endY: 206, id: 3 },
  { startX: 106, startY: 106, endX : 206, endY: 206, id: 4 },
  { startX: 209, startY: 106, endX : 309, endY: 206, id: 5 },
  { startX: 3, startY: 209, endX : 103, endY: 309, id: 6 },
  { startX: 106, startY: 209, endX : 206, endY: 309, id: 7 },
  { startX: 209, startY: 209, endX : 309, endY: 309, id: 8 },
]

export const CONDITIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

export default class GameBoard extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  boardClickHandler(e) {
    const { locationX, locationY } = e.nativeEvent;
    const { userInputs, aiInputs, gameDone } = this.props;
    const { addUserInput } = this.props.gameActions;

    if(gameDone) {
      return;
    }

    const inputs = userInputs.concat(aiInputs);

    const area = AREAS.find(d =>
      (locationX >= d.startX && locationX <= d.endX) &&
      (locationY >= d.startY && locationY <= d.endY));


    // console.log(area.id);
    addUserInput(area.id);
    this.judgeWinner()
    this.AIAction()
  }

  isWinner(inputs: number[]) {
    return CONDITIONS.some(d => d.every(item => inputs.indexOf(item) !== -1))
  }

  judgeWinner() {
    const { userInputs, aiInputs, won } = this.props;
    const inputs = userInputs.concat(aiInputs);
    let res = this.isWinner(userInputs)
    console.log(res);
    if (inputs.length >= 5 ) {

    }

    // if (inputs.length === 9 &&
    //     result === GAME_RESULT_NO && result !== GAME_RESULT_TIE) {
    //   this.setState({ result: GAME_RESULT_TIE })
    // }
  }

  AIAction() {
    const { userInputs, aiInputs, gameDone } = this.props;
    const { addAIInput } = this.props.gameActions;
    const inputs = userInputs.concat(aiInputs);
    if (gameDone) {
      return;
    }
    while(true) {

      const randomNumber = Math.round(Math.random() * 8.3)
      if (inputs.every(d => d !== randomNumber)) {
        addAIInput(randomNumber);
        this.judgeWinner();
        break;
      }
    }
  }

  render() {
    const { aiInputs, userInputs } = this.props;
    return (
      <View style={styles.container}>
      <TouchableWithoutFeedback onPress={e => this.boardClickHandler(e)}>

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
