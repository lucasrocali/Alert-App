import { createStore, applyMiddleware } from 'redux';
import { apiMiddleware, reducer } from '../reducers';
import logger from 'redux-logger'

// Create Redux store
const store = createStore(
	reducer, {},
	applyMiddleware(apiMiddleware,logger)
);

export default store;
