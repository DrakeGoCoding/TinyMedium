import { APP_LOAD, ASYNC_START, LOGIN, REDIRECT, REGISTER } from "../constants/actionTypes";

const defaultState = {
	appName: 'Medium',
	token: null,
}

export default function commonReducer(state = defaultState, action) {
	switch (action.type) {
		case APP_LOAD:
			return {
				...state,
				token: action.token || null,
				appLoaded: true,
				currentUser: action.payload ? action.payload.data.user : null,
			};
		case REDIRECT:
			return { ...state, redirectTo: null, };
		case LOGIN:
		case REGISTER:
			return {
				...state,
				redirectTo: action.error ? null : '/',
				token: action.error ? null : action.payload.data.user.token,
				currentUser: action.error ? null : action.payload.data.user
			};
		case ASYNC_START:
			return { ...state, inProgress: true };
		default:
			return state;
	}
}