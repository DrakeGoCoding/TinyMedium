import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import agent from '../agent';
import { FOLLOW_USER, PROFILE_PAGE_LOADED, PROFILE_PAGE_UNLOADED, UNFOLLOW_USER } from '../constants/actionTypes';
import { store } from '../store';
import defaultAvatar from '../assets/defaultAvatar.jpeg';
import ArticleList from './ArticleList';

function EditProfileSettings(props) {
	if (props.isUser) {
		return (
			<Link
				to="/settings"
				className="btn btn-sm btn-outline-secondary action-btn">
				<i className="ion-gear-a"></i> Edit Profile Settings
			</Link>
		)
	}
	return null;
}

function FollowUserButton(props) {
	if (props.isUser) {
		return null;
	}

	let classes = 'btn btn-sm action-btn';
	if (props.user.following) {
		classes += ' btn-secondary';
	} else {
		classes += ' btn-outline-secondary';
	}

	const handleClick = e => {
		e.preventDefault();
		if (props.user.following) {
			props.unfollow(props.user.username);
		} else {
			props.follow(props.user.username);
		}
	}

	return (
		<button className={classes} onClick={handleClick}>
			<i className="ion-plus-round"></i>
			&nbsp;
			{props.user.following ? 'Unfollow' : 'Follow'} {props.user.username}
		</button>
	);
}

export default function ProfileFavorites() {
	const { username } = useParams();

	const articleList = useSelector(state => state.articleList);
	const currentUser = useSelector(state => state.common.currentUser);
	const profile = useSelector(state => state.profile);
	const isUser = currentUser && profile.username === currentUser.username;

	const onFollow = (username) => store.dispatch({
		type: FOLLOW_USER,
		payload: agent.Profile.follow(username)
	});
	const onUnfollow = (username) => store.dispatch({
		type: UNFOLLOW_USER,
		payload: agent.Profile.unfollow(username)
	});
	const onLoad = (pager, payload) => store.dispatch({
		type: PROFILE_PAGE_LOADED,
		pager,
		payload
	});
	const onUnload = () => store.dispatch({ type: PROFILE_PAGE_UNLOADED });

	useEffect(() => {
		if (username) {
			onLoad(
				(page) => agent.Articles.favoritedBy(username, page),
				Promise.all([
					agent.Profile.get(username),
					agent.Articles.favoritedBy(username)
				])
			);
		}
	}, [username]);

	useEffect(() => {
		return () => {
			onUnload();
		}
	}, []);

	return (
		profile
			?
			<div className="profile-page">
				<div className="user-info">
					<div className="container">
						<div className="row">
							<div className="col-xs-12 col-md-10 offset-md-1">
								<img src={profile.image || defaultAvatar} alt={profile.username} className="user-img" />
								<h4>{profile.username}</h4>
								<p>{profile.bio}</p>

								<EditProfileSettings isUser={isUser} />
								<FollowUserButton
									isUser={isUser}
									user={profile}
									follow={onFollow}
									unfollow={onUnfollow} />
							</div>
						</div>
					</div>
				</div>

				<div className="container">
					<div className="row">
						<div className="col-xs-12 col-md-10 offset-md-1">
							<div className="articles-toggle">
								<ul className="nav nav-pills outline-active">
									<li className="nav-item">
										<Link
											className="nav-link"
											to={`/@${profile.username}`}>
											My Articles
										</Link>
									</li>

									<li className="nav-item">
										<Link
											className="nav-link active"
											to={`/@${profile.username}/favorites`}>
											Favorited Articles
										</Link>
									</li>
								</ul>
							</div>

							<ArticleList
								pager={articleList.pager}
								articles={articleList.articles}
								articlesCount={articleList.articlesCount}
								currentPage={articleList.currentPage} />
						</div>
					</div>
				</div>
			</div>
			: null
	)
}

