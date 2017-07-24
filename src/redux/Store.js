import C from './Constants';
import createReducer from './Reducers';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
const consoleMessages = store => next => action => {

	let result;

	console.log(`dispatching action => ${action.type}`);

	result = next(action);

	// console.log(`${JSON.stringify(store.getState())}`);
	// console.log(store.getState().token);
	return result;

}

export default (initialState = {}, client) => {
	// return applyMiddleware(thunk,consoleMessages)(createStore)(appReducer, initialState)
	const rootReducer = createReducer(client.reducer())
	// console.log("store", rootReducer);
	return createStore(
		rootReducer,
		initialState,
		applyMiddleware(thunk, consoleMessages, client.middleware())
	);
}
