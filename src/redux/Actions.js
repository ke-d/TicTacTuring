import C from './Constants';
import { AsyncStorage } from 'react-native';

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

export const login = (token) => (dispatch, getState) => {
  AsyncStorage.setItem("token", token);
}

export const logout = () => (dispatch, getState) => {
  AsyncStorage.removeItem("token")
  .then((value) => {
    console.log("logout", value);

  });
}
