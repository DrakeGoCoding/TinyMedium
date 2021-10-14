import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import reducer from './reducers';
import { localStorageMiddleware, promiseMiddleware } from './middleware';

const getMiddleware = () => {
	if (process.env.NODE_ENV === 'production') {
		return applyMiddleware(promiseMiddleware, localStorageMiddleware);
	}
	return applyMiddleware(promiseMiddleware, localStorageMiddleware, createLogger());
}

export const store = createStore(
	reducer,
	composeWithDevTools(getMiddleware())
);