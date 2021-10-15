import {
	APP_LOAD,
	ARTICLE_SUBMITTED,
	ASYNC_START,
	DELETE_ARTICLE,
	LOGIN,
	LOGOUT,
	REDIRECT,
	REGISTER,
	SETTINGS_SAVED
} from "../constants/actionTypes";

const defaultState = {
	appName: 'Medium',
	token: null,
}

export default function commonReducer(state = defaultState, action) {
	switch (action.type) {
		case ASYNC_START:
			return { ...state, inProgress: true };
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
		case LOGOUT:
			return { ...state, redirectTo: '/', token: null, currentUser: null };
		case SETTINGS_SAVED:
			return {
				...state,
				redirectTo: action.error ? null : '/',
				currentUser: action.error ? null : action.payload.data.user,
			};
		case ARTICLE_SUBMITTED:
			return {
				...state,
				redirectTo: action.error ? null : `/article/${action.payload.data.article.slug}`,
			};
		case DELETE_ARTICLE:
			return {
				...state,
				redirectTo: action.error ? null : '/'
			}
		default:
			return state;
	}
}