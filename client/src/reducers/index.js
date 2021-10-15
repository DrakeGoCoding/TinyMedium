import { combineReducers } from 'redux';
import article from './article';
import articleList from './articleList';
import auth from './auth';
import editor from './editor';
import home from './home';
import common from './common';
import settings from './settings';

export default combineReducers({
	article,
	articleList,
	auth,
	editor,
	home,
	common,
	settings,
});