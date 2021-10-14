import { 
	ASYNC_START, 
	SETTINGS_PAGE_UNLOADED, 
	SETTINGS_SAVED 
} from "../constants/actionTypes";

export default function settingsReducer(state = {}, action) {
	switch (action.type) {
		case SETTINGS_SAVED:
			return {
				...state,
				inProgress: false,
				errors: action.error ? action.payload.data.errors : null,
			};
		case SETTINGS_PAGE_UNLOADED:
			return {};
		case ASYNC_START:
			if (action.subtype === SETTINGS_SAVED) {
				return { ...state, inProgress: true }
			}
			return state;
		default:
			return state;
	}
}