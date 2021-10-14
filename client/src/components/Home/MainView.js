import React from 'react'
import { useSelector } from 'react-redux';
import agent from '../../agent';
import ArticleList from '../ArticleList';

function YourFeedTab(props) {
	const token = props.token;

	const handleTabClick = e => {
		e.preventDefault();
		props.onTabClick('feed', agent.Articles.feed, agent.Articles.feed());
	}

	return (
		token
			?
			<li className="nav-item">
				<a
					href="/"
					className={props.tab === 'feed' ? 'nav-link active' : 'nav-link'}
					onClick={handleTabClick}>
					Your Feed
				</a>
			</li>
			:
			null
	);
}

function GlobalFeedTab(props) {
	const handleTabClick = e => {
		e.preventDefault();
		props.onTabClick('all', agent.Articles.all, agent.Articles.all());
	}

	return (
		<li className="nav-item">
			<a
				href="/"
				className={props.tab === 'all' ? 'nav-link active' : 'nav-link'}
				onClick={handleTabClick}>
				Global Feed
			</a>
		</li>
	);
}

function TagFilterTab(props) {
	const tag = props.tag;

	return (
		tag
			?
			<li className="nav-item">
				<a href="/" className="nav-link active">
					<i className="ion-pound"></i> {tag}
				</a>
			</li>
			: null
	);
}

export default function MainView() {
	const articleList = useSelector(state => state.articleList);
	const token = useSelector(state => state.common.token);

	const onTabClick = (tab, pager, payload) => {
		
	}

	return (
		<div className="col-md-9">
			<div className="feed-toggle">
				<ul className="nav nav-pills outline-active">
					<YourFeedTab
						token={token}
						tab={articleList.tab}
						onTabClick={onTabClick} />

					<GlobalFeedTab tab={articleList.tab} onTabClick={onTabClick} />

					<TagFilterTab tag={articleList.tag} />
				</ul>
			</div>

			<ArticleList
				pager={articleList.pager}
				articles={articleList.articles}
				loading={articleList.loading}
				articlesCount={articleList.articlesCount}
				currentPage={articleList.currentPage} />
		</div>
	)
}
