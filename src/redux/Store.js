import C from './Constants';
import appReducer from './Reducers';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

const consoleMessages = store => next => action => {

	let result;

	console.log(`dispatching action => ${action.type}`);

	result = next(action);

	console.log(`${JSON.stringify(store.getState())}`);

	return result;

}

export default (initialState={}) => {
	// console.log("store", initialState);
	return applyMiddleware(thunk,consoleMessages)(createStore)(appReducer, initialState)
}


// export default (initialState = {}) => createStore(appReducer, initialState)
