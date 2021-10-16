import React from 'react'
import { Link } from 'react-router-dom';
import defaultAvatar from '../../assets/defaultAvatar.jpeg';
import ArticleActions from './ArticleActions';

export default function ArticleMeta(props) {
	const article = props.article;

	return (
		<div className="article-meta">
			<Link to={`/@${article.author.username}`}>
				<img src={article.author.image || defaultAvatar} alt={article.author.username} />
			</Link>

			<div className="info">
				<Link to={`/@${article.author.username}`} className="author">
					{article.author.username}
				</Link>
				<span className="date">
					{new Date(article.createdAt).toDateString()}
				</span>
			</div>

			<ArticleActions editable={props.editable} article={article} />
		</div>
	)
}
