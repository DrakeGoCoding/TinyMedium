import React from 'react'
import { useDispatch } from 'react-redux';
import agent from '../../agent';
import { DELETE_COMMENT } from '../../constants/actionTypes';

export default function DeleteButton(props) {
	const dispatch = useDispatch();
	const { show, slug, commentId } = props;

	const onClick = e => {
		e.preventDefault();
		const payload = agent.Comments.del(slug, commentId);
		dispatch({ type: DELETE_COMMENT, payload, commentId });
	}

	return (
		show
			?
			<span className="mod-options">
				<i className="ion-trash-a" onClick={onClick}></i>
			</span>
			: null
	)
}
