import C from './Constants';

export const addGame = (id, won, datePlayed) => ({
  type: C.ADD_GAME,
  payload: {id, won, datePlayed}
});

export const setGame = (games) => ({
  type: C.SET_GAMES,
  payload: games
});

export const setEmail = (email) => ({
  type: C.SET_EMAIL,
  payload: email
});

export const setToken = (token) => ({
  type: C.SET_EMAIL,
  payload: token
});
