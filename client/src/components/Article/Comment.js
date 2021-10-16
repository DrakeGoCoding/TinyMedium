import React from 'react'
import { Link } from 'react-router-dom';
import DeleteButton from './DeleteButton';
import defaultAvatar from '../../assets/defaultAvatar.jpeg';

export default function Comment(props) {
	const slug = props.slug;
	const currentUser = props.currentUser;
	const comment = props.comment;

	const show = currentUser && currentUser.username === comment.author.username;

	return (
		<div className="card">
			<div className="card-block">
				<p className="card-text">{comment.body}</p>
			</div>
			<div className="card-footer">
				<Link
					to={`/@${comment.author.username}`}
					className="comment-author">
					<img src={comment.author.image || defaultAvatar} className="comment-author-img" alt={comment.author.username} />
				</Link>
				&nbsp;
				<Link
					to={`/@${comment.author.username}`}
					className="comment-author">
					{comment.author.username}
				</Link>
				<span className="date-posted">
					{new Date(comment.createdAt).toDateString()}
				</span>
				<DeleteButton show={show} slug={slug} commentId={comment.id} />
			</div>
		</div>
	)
}
