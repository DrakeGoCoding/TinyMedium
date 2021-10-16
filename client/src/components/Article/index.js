import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import agent from '../../agent';
import { ARTICLE_PAGE_LOADED, ARTICLE_PAGE_UNLOADED } from '../../constants/actionTypes';
import { store } from '../../store';
import marked from 'marked';
import ArticleMeta from './ArticleMeta';
import CommentContainer from './CommentContainer';

export default function Article() {
	const { slug } = useParams();
	const history = useHistory();

	const article = useSelector(state => state.article.article);
	const comments = useSelector(state => state.article.comments);
	const commentErrors = useSelector(state => state.article.commentErrors);
	const currentUser = useSelector(state => state.common.currentUser);

	const [editable, setEditable] = useState(false);
	const [markup, setMarkup] = useState(null);

	const onLoad = (payload) => store.dispatch({ type: ARTICLE_PAGE_LOADED, payload });
	const onUnload = () => store.dispatch({ type: ARTICLE_PAGE_UNLOADED });

	useEffect(() => {
		if (slug) {
			onLoad(Promise.all([
				agent.Articles.bySlug(slug),
				agent.Comments.forArticle(slug)
			]));
		}
	}, [slug])

	useEffect(() => {
		if (currentUser && article) {
			setEditable(currentUser.username === article.author.username);
			setMarkup({ __html: marked(article.body, { sanitize: true }) });
		} else {
			history.push('/');
		}
	}, [article, currentUser, history])

	useEffect(() => {
		return () => {
			onUnload();
		}
	}, []);

	return (
		article
			?
			<div className="article-page">
				<div className="banner">
					<div className="container">
						<h1>{article.title}</h1>
						<ArticleMeta
							article={article}
							editable={editable} />
					</div>
				</div>

				<div className="container page">
					<div className="row article-content">
						<div className="col-xs-12">
							{markup ? <div dangerouslySetInnerHTML={markup}></div> : null}
							<ul className="tag-list">
								{
									article.tagList.map(tag => {
										return (
											<li
												className="tag-default tag-pill tag-outline"
												key={tag}>
												{tag}
											</li>
										)
									})
								}
							</ul>
						</div>
					</div>

					<hr />

					<div className="article-actions"></div>

					<div className="row">
						<CommentContainer
							comments={comments}
							errors={commentErrors}
							slug={slug}
							currentUser={currentUser} />
					</div>
				</div>
			</div>
			: null
	)
}
