import { ADD_TAG, ARTICLE_SUBMITTED, ASYNC_START, EDITOR_PAGE_LOADED, EDITOR_PAGE_UNLOADED, REMOVE_TAG, UPDATE_FIELD_EDITOR } from "../constants/actionTypes";

export default function editorReducer(state = {}, action) {
	switch (action.type) {
		case ASYNC_START:
			if (action.subtype === ARTICLE_SUBMITTED) {
				return { ...state, inProgress: true };
			};
			return state;
		case EDITOR_PAGE_LOADED:
			return {
				...state,
				slug: action.payload ? action.payload.data.article.slug : '',
				title: action.payload ? action.payload.data.article.title : '',
				description: action.payload ? action.payload.data.article.description : '',
				body: action.payload ? action.payload.data.article.body : '',
				tagList: action.payload ? action.payload.data.article.tagList : []
			};
		case EDITOR_PAGE_UNLOADED:
			return {};
		case ARTICLE_SUBMITTED:
			return {
				...state,
				inProgress: false,
				errors: action.error ? action.payload.data.errors : null
			};
		case ADD_TAG:
			return {
				...state,
				tagList: [...state.tagList, action.tag],
			};
		case REMOVE_TAG:
			return {
				...state,
				tagList: state.tagList.filter(tag => tag !== action.tag)
			}
		case UPDATE_FIELD_EDITOR:
			return { ...state, [action.key]: action.value };
		default:
			return state;
	}
}