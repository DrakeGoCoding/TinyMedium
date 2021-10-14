import agent from "./agent";
import { ASYNC_START, LOGIN, LOGOUT, REGISTER } from "./constants/actionTypes";

export const promiseMiddleware = store => next => action => {
	if (isPromise(action.payload)) {
		store.dispatch({ type: ASYNC_START, subtype: action.type });

		action.payload.then(
			res => {
				console.log(res);
				action.payload = res;
				store.dispatch(action);
			},
			error => {
				console.log(error);
				action.error = true;
				action.payload = error.response;
				store.dispatch(action);
			}
		);

		return;
	}

	next(action);
}

export const localStorageMiddleware = store => next => action => {
	if (action.type === REGISTER || action.type === LOGIN) {
		if (!action.error) {
			localStorage.setItem('jwt', action.payload.data.user.token);
			agent.setToken(action.payload.data.user.token);
		}
	} else if (action.type === LOGOUT) {
		localStorage.removeItem('jwt');
		agent.setToken(null);
	}

	next(action);
};

function isPromise(v) {
	return v && typeof v.then === 'function';
}