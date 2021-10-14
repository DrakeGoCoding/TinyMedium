import { combineReducers } from 'redux';
import article from './article';
import articleList from './articleList';
import auth from './auth';
import home from './home';
import common from './common';
import settings from './settings';

export default combineReducers({
	article,
	articleList,
	auth,
	home,
	common,
	settings,
});