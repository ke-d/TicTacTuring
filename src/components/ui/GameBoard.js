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
    //props.gameActions.resetGame();
  }

  boardClickHandler(e) {
    const { pageX, pageY } = e.nativeEvent;
    const { addUserInput } = this.props.gameActions;

    //Offsets for the differences between the root element pageXY and locationXY
    const offSetX = pageX - 50;
    const offSetY = pageY - 50;

    const { userInputs, aiInputs, gameDone } = this.props;
    const inputs = userInputs.concat(aiInputs);

    if(gameDone) {
      return;
    }


    const area = AREAS.find(d =>
      (offSetX >= d.startX && offSetX <= d.endX) &&
      (offSetY >= d.startY && offSetY <= d.endY));


    if(area === undefined) {
      return;
    }
    console.log(area.id);

    if (inputs.every(d => d !== area.id)) {
      addUserInput(area.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log("next", nextProps);
    const { gameDone, userInputs, aiInputs, won, submitGame, navIndex } = nextProps;
    const newGame = this.props.gameDone === true && gameDone === false;
    const gameOver = this.props.gameDone === false && gameDone === true;

    if(gameOver) {
      submitGame(won);
    }

    if(this.props.navIndex > navIndex) {
      nextProps.gameActions.resetGame();
    }

    if(this.props.userInputs.length < userInputs.length && !gameDone && !newGame) {
      this.judgeWinner(nextProps, "HUMAN");
      this.AIAction(nextProps);
    }

    if(this.props.aiInputs.length < aiInputs.length && !gameDone && !newGame) {
      this.judgeWinner(nextProps, "AI");
    }
  }

  isWinner(inputs: number[]) {
    return CONDITIONS.some(d => d.every(item => inputs.indexOf(item) !== -1));
  }

  judgeWinner(nextProps, turn) {
    let { userInputs, aiInputs, gameDone } = nextProps;
    let { setWinner, setGameDone } = nextProps.gameActions;

    if(gameDone) {
      return;
    }

    const inputs = userInputs.concat(aiInputs);
    let haveAWinner = this.isWinner(turn === "HUMAN" ? userInputs : aiInputs);


    if (inputs.length >= 5 && haveAWinner) {
      // console.log("result", `${turn}` );
      setGameDone(true);
      setWinner(turn === "HUMAN" ? true : false);
    } else if (inputs.length === 9) {
      //console.log(`No winner on turn ${turn}`);
      setGameDone(true);
      setWinner(false);
    }

  }

  AIAction(nextProps) {
    const { userInputs, aiInputs, gameDone } = nextProps;
    const { addAIInput } = nextProps.gameActions;
    const inputs = userInputs.concat(aiInputs);
    if (gameDone) {
      return;
    }
    while(inputs.length < 9) {

      const randomNumber = Math.round(Math.random() * 8.3);

      if (inputs.every(d => d !== randomNumber)) {
        addAIInput(randomNumber);
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
