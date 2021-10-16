import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import agent from '../../agent';
import { DELETE_ARTICLE } from '../../constants/actionTypes';

export default function ArticleActions(props) {
	const dispatch = useDispatch();
	const article = props.article;

	const onDeleteBtnClick = (e) => {
		e.preventDefault();
		dispatch({
			type: DELETE_ARTICLE,
			payload: agent.Articles.del(article.slug)
		});
	}

	return (
		props.editable
			?
			<span>
				<Link
					to={`/editor/${article.slug}`}
					className="btn btn-outline-secondary btn-sm">
					<i className="ion-edit"></i> Edit Article
				</Link>
				&nbsp;
				<button className="btn btn-outline-danger btn-sm" onClick={onDeleteBtnClick}>
					<i className="ion-trash-a"></i> Delete Article
				</button>
			</span>
			:
			null
	)
}
