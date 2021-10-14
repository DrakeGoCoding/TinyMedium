import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import agent from '../../agent';
import { APPLY_TAG_FILTER, HOME_PAGE_LOADED, HOME_PAGE_UNLOADED } from '../../constants/actionTypes';
import { store } from '../../store';
import Banner from './Banner';
import MainView from './MainView';
import Tags from './Tags';

export default function Home() {
	const appName = useSelector(state => state.common.appName);
	const token = useSelector(state => state.common.token);
	const home = useSelector(state => state.home);

	const onClickTag = (tag, pager, payload) => {
		store.dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload });
	}

	const onLoad = (tab, pager, payload) => {
		store.dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload });
	}

	const onUnload = () => {
		store.dispatch({ type: HOME_PAGE_UNLOADED });
	}

	useEffect(() => {
		const tab = token ? 'feed' : 'all';
		const articlesPromise = token
			? agent.Articles.feed
			: agent.Articles.all;
		onLoad(tab, articlesPromise, Promise.all([agent.Tags.popular(), articlesPromise()]));
		return () => {
			onUnload();
		}
	}, [token]);

	return (
		<div className="home-page">
			<Banner
				token={token}
				appName={appName} />

			<div className="container page">
				<div className="row">
					<MainView />

					<div className="col-md-3">
						<div className="sidebar">
							<p>Popular Tags</p>
							<Tags
								tags={home.tags}
								onClickTag={onClickTag} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

