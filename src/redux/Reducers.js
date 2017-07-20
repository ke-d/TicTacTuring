import C from './Constants';
import { combineReducers } from 'redux';
import { AppNavigator } from '../navigation/AppNavigator';

const initialHome = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams("Home"));

export const nav = (state = initialHome, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

export const email = (state = "", action) => {
  switch(action.type) {
    case C.SET_EMAIL:
      return action.payload;

    default:
      return state;
  }
}

export const games = (state = [], action) => {
  switch(action.type) {
    case C.SET_GAMES:
      return action.payload;

    case C.ADD_GAME:
      return [...state, action.payload];

    default:
      return state;
  }
}

export const fetching = (state = false, action) => {
  switch(action.type) {
    case C.SET_GAMES:
      return false;

    case C.SET_EMAIL:
      return false;

    case C.FETCH_USER:
      return true;

    default:
      return state;
  }
}

export const token = (state = "", action) => {
  switch(action.type) {
    case C.SET_TOKEN:
      return action.payload;

    default:
      return state;
  }
}

export default createReducer = (apollo) => {
  return combineReducers({
    nav,
    user: combineReducers({
      email,
      games
    }),
    fetching,
    token,
    apollo
  });
}
