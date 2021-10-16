import {
	APPLY_TAG_FILTER,
	ARTICLE_FAVORITED,
	ARTICLE_UNFAVORITED,
	CHANGE_TAB,
	HOME_PAGE_LOADED,
	HOME_PAGE_UNLOADED,
	PROFILE_PAGE_LOADED,
	PROFILE_PAGE_UNLOADED,
	SET_PAGE
} from "../constants/actionTypes";

export default function articleListReducer(state = {}, action) {
	switch (action.type) {
		case ARTICLE_FAVORITED:
		case ARTICLE_UNFAVORITED:
			return {
				...state,
				articles: state.articles.map(article => {
					if (article.slug === action.payload.data.article.slug) {
						return {
							...article,
							favorited: action.payload.data.article.favorited,
							favoritesCount: action.payload.data.article.favoritesCount
						};
					}
					return article;
				})
			};
		case APPLY_TAG_FILTER:
			return {
				...state,
				pager: action.pager,
				articles: action.payload.data.articles,
				articlesCount: action.payload.data.articlesCount,
				tab: null,
				tag: action.tag,
				currentPage: 0
			};
		case CHANGE_TAB:
			return {
				...state,
				pager: action.pager,
				articles: action.payload.data.articles,
				articlesCount: action.payload.data.articlesCount,
				tab: action.tab,
				currentPage: 0,
				tag: null
			};
		case HOME_PAGE_LOADED:
			return {
				...state,
				pager: action.pager,
				tags: action.payload[0].data.tags,
				articles: action.payload[1].data.articles,
				articlesCount: action.payload[1].data.articlesCount,
				currentPage: 0,
				tab: action.tab
			};
		case HOME_PAGE_UNLOADED:
			return {};
		case SET_PAGE:
			return {
				...state,
				articles: action.payload.data.articles,
				articlesCount: action.payload.data.articlesCount,
				currentPage: action.page,
			}
		case PROFILE_PAGE_LOADED:
			return {
				...state,
				pager: action.pager,
				articles: action.payload[1].data.articles,
				articlesCount: action.payload[1].data.articlesCount,
				currentPage: 0,
			};
		case PROFILE_PAGE_UNLOADED:
			return {};
		default:
			return state;
	}
}