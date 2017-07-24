import C from './Constants';
import { combineReducers } from 'redux';
import { AppNavigator } from '../navigation/AppNavigator';

const initialHome = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams("Home"));

export const nav = (state = initialHome, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

export const userInputs = (state = [], action) => {
  switch(action.type) {
    case C.ADD_USER_INPUT:
      return [...state, action.payload];

    case C.RESET_GAME:
      return [];

    default:
      return state;
  }
}

export const aiInputs = (state = [], action) => {
  switch(action.type) {
    case C.ADD_AI_INPUT:
      return [...state, action.payload];

    case C.RESET_GAME:
      return [];

    default:
      return state;
  }
}

export const gameDone = (state = false, action) => {
  switch(action.type) {
    case C.SET_GAME_DONE:
      return action.payload;

    case C.RESET_GAME:
      return false;

    default:
      return state;
  }
}

export const won = (state = false, action) => {
  switch(action.type) {
    case C.SET_WINNER:
      return action.payload;

    case C.RESET_GAME:
      return false;

    default:
      return state;
  }
}

export const token = (state = "", action) => {
  switch(action.type) {
    case C.SET_TOKEN:
      return action.payload;

    case C.CLEAR_TOKEN:
      return "";

    default:
      return state;
  }
}

export default createReducer = (apollo) => {
  return combineReducers({
    nav,
    game: combineReducers({
      userInputs,
      aiInputs,
      gameDone,
      won
    }),
    token,
    apollo
  });
}
