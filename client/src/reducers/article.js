import { ADD_COMMENT, ARTICLE_PAGE_LOADED, ARTICLE_PAGE_UNLOADED, DELETE_COMMENT } from "../constants/actionTypes";

export default function articleReducer(state = {}, action) {
	switch (action.type) {
		case ARTICLE_PAGE_LOADED:
			return {
				...state,
				article: action.payload ? action.payload[0].data.article : null,
				comments: action.payload ? action.payload[1].data.comments : [],
			};
		case ARTICLE_PAGE_UNLOADED:
			return {};
		case ADD_COMMENT:
			return {
				...state,
				commentErrors: action.error ? action.payload.data.errors : null,
				comments: action.error ? [...state.comments] : [action.payload.data.comment, ...state.comments]
			}
		case DELETE_COMMENT:
			return {
				...state,
				comments: state.comments.filter(
					comment => comment.id !== action.commentId
				)
			}
		default:
			return state;
	}
}