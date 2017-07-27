import C from './Constants';

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


export const addUserGames = (input) => ({
  type: C.ADD_USER_GAMES,
  payload: input
});

export const addUserInput = (input) => ({
  type: C.ADD_USER_INPUT,
  payload: input
});

export const addAIInput = (input) => ({
  type: C.ADD_AI_INPUT,
  payload: input
});

export const setGameDone = (done) => ({
  type: C.SET_GAME_DONE,
  payload: done
});

export const setWinner = (won) => ({
  type: C.SET_WINNER,
  payload: won
});

export const resetGame = () => ({
  type: C.RESET_GAME
});

export const onUserAction = (e) => (dispatch, getState) => {
  const { pageX, pageY } = e.nativeEvent;

  //Offsets for the differences between the root element pageXY and locationXY
  const offSetX = pageX - 50;
  const offSetY = pageY - 50;

  const { userInputs, aiInputs, gameDone } = getState().game;
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

  if (inputs.every(d => d !== area.id)) {
    dispatch(
      addUserInput(area.id)
    );
    dispatch(
      judgeWinner("HUMAN")
    );
    dispatch(
      AIAction()
    );
  }
}

const judgeWinner = (turn) => (dispatch, getState) => {
  let { userInputs, aiInputs, gameDone } = getState().game;
  if(gameDone) {
    return;
  }

  const inputs = userInputs.concat(aiInputs);
  const haveAWinner = isWinner(turn === "HUMAN" ? userInputs : aiInputs);


  if (inputs.length >= 5 && haveAWinner) {
    // console.log("result", `${turn}` );
    dispatch(
      setGameDone(true)
    );
    dispatch(
      setWinner(turn === "HUMAN" ? true : false)
    );
  } else if (inputs.length === 9) {
    //console.log(`No winner on turn ${turn}`);
    dispatch(
      setGameDone(true)
    );
    dispatch(
      setWinner(false)
    );
  }

}

const AIAction = () => (dispatch, getState) => {
  const { userInputs, aiInputs, gameDone } = getState().game;
  const inputs = userInputs.concat(aiInputs);
  if (gameDone) {
    return;
  }
  while(inputs.length < 9) {

    const randomNumber = Math.round(Math.random() * 8.3);

    if (inputs.every(d => d !== randomNumber)) {
      dispatch(
        addAIInput(randomNumber)
      );
      dispatch(
        judgeWinner("AI")
      );
      break;
    }
  }
}

const isWinner = (inputs: number[]) => {
  return CONDITIONS.some(d => d.every(item => inputs.indexOf(item) !== -1));
}



export const login = (token) => (dispatch, getState) => {
  dispatch({
    type: C.SET_TOKEN,
    payload: token
  });
  dispatch({
    type: C.SET_USER_GAMES,
    payload: []
  });
};

export const logout = () => (dispatch, getState) => {
  dispatch({
      type: C.CLEAR_TOKEN
  });
  dispatch({
    type: C.SET_USER_GAMES,
    payload: []
  });
};
