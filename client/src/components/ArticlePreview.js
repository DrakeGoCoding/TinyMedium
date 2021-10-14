import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import agent from '../agent';
import defaultAvatar from '../assets/defaultAvatar.jpeg';
import { ARTICLE_FAVORITED, ARTICLE_UNFAVORITED } from '../constants/actionTypes';

export default function ArticlePreview(props) {
	const dispatch = useDispatch();
	const favorite = (slug) => {
		dispatch({
			type: ARTICLE_FAVORITED,
			payload: agent.Articles.favorite(slug)
		})
	}
	const unfavorite = (slug) => {
		dispatch({
			type: ARTICLE_UNFAVORITED,
			payload: agent.Articles.unfavorite(slug)
		})
	}

	const article = props.article;
	const favoriteBtnClass = article.favorited
		? 'btn btn-sm btn-primary'
		: 'btn btn-sm btn-outline-primary';

	const onClickFavoriteBtn = (e) => {
		e.preventDefault();
		if (article.favorited) {
			unfavorite(article.slug);
		} else {
			favorite(article.slug);
		}
	}

	return (
		<div className="article-preview">
			<div className="article-meta">
				<Link to={`/@${article.author.username}`}>
					<img src={article.author.image || defaultAvatar} alt={article.author.username} />
				</Link>

				<div className="info">
					<Link className="author" to={`/@${article.author.username}`}>
						{article.author.username}
					</Link>
					<span className="date">
						{new Date(article.createdAt).toDateString()}
					</span>
				</div>

				<div className="pull-xs-right">
					<button className={favoriteBtnClass} onClick={onClickFavoriteBtn}>
						<i className="ion-heart"></i> {article.favoritesCount}
					</button>
				</div>
			</div>

			<Link to={`/article/${article.slug}`} className="preview-link">
				<h1>{article.title}</h1>
				<p>{article.description}</p>
				<span>Read more...</span>
				<ul className="tag-list">
					{
						article.tagList.map(tag => {
							return (
								<li className="tag-default tag-pill tag-outline" key={tag}>
									{tag}
								</li>
							)
						})
					}
				</ul>
			</Link>
		</div>
	)
}
