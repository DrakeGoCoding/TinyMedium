import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import agent from '../../agent';
import { ADD_COMMENT } from '../../constants/actionTypes';
import defaultAvatar from '../../assets/defaultAvatar.jpeg';

export default function CommentInput(props) {
	const slug = props.slug;
	const currentUser = props.currentUser;

	const dispatch = useDispatch();
	const [body, setBody] = useState('');

	const changeBody = e => setBody(e.target.value);

	const createComment = e => {
		e.preventDefault();
		const payload = agent.Comments.create(slug, { body });
		setBody('');
		dispatch({ type: ADD_COMMENT, payload });
	}

	return (
		<form className="card comment-form" onSubmit={createComment}>
			<div className="card-block">
				<textarea className="form-control"
					placeholder="Write a comment..."
					value={body}
					onChange={changeBody}
					rows="3">
				</textarea>
			</div>
			<div className="card-footer">
				<img
					src={currentUser.image || defaultAvatar}
					className="comment-author-img"
					alt={currentUser.username} />
				<button
					className="btn btn-sm btn-primary"
					type="submit">
					Post Comment
				</button>
			</div>
		</form>
	)
}
