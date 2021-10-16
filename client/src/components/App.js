import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import agent from '../agent';
import { APP_LOAD, REDIRECT } from '../constants/actionTypes';
import { store } from '../store';
import Article from './Article';
import Editor from './Editor';
import Header from './Header'
import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import ProfileFavorites from './ProfileFavorites';
import Register from './Register';
import Settings from './Settings';

export default function App() {
	const history = useHistory();
	const common = useSelector(state => state.common);

	const onLoad = (payload, token) => {
		store.dispatch({ type: APP_LOAD, payload, token })
	}

	const onRedirect = () => {
		store.dispatch({ type: REDIRECT });
	}

	useEffect(() => {
		if (common.redirectTo) {
			history.push(common.redirectTo);
			onRedirect();
		}
	}, [common.redirectTo, history])

	useEffect(() => {
		const token = localStorage.getItem('jwt');
		if (token) {
			agent.setToken(token);
		}
		onLoad(token ? agent.Auth.current() : null, token);
	}, [])

	return (
		<div>
			<Header
				appName={common.appName}
				currentUser={common.currentUser} />
			{
				common.appLoaded
					?
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/login" component={Login} />
						<Route path="/register" component={Register} />
						<Route path="/editor/:slug" component={Editor} />
						<Route path="/editor" component={Editor} />
						<Route path="/article/:slug" component={Article} />
						<Route path="/settings" component={Settings} />
						<Route path="/@:username/favorites" component={ProfileFavorites} />
						<Route path="/@:username" component={Profile} />
					</Switch>
					: null
			}
		</div>
	)
}
