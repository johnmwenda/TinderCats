import { applyMiddleware, compose, createStore } from 'redux'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'

import reducer from './Reducer'

let finalCreateStore = compose(
  applyMiddleware(thunk, createLogger())
)(createStore)


export default function configureStore(initialState = { cats: [], user: {} }) {
	console.log(initialState)
  	return finalCreateStore(reducer, initialState)
}
