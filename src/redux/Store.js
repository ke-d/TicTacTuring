import C from './Constants';
import appReducer from './Reducers';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

const consoleMessages = store => next => action => {

	let result

	console.groupCollapsed(`dispatching action => ${action.type}`)
	result = next(action)

	console.log(`${store.getState()}`)

	console.groupEnd()

	return result

}

export default (initialState={}) => {
	console.log("store", initialState);
	return applyMiddleware(thunk,consoleMessages)(createStore)(appReducer, initialState)
}
