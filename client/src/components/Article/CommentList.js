import React from 'react'
import Comment from './Comment';

export default function CommentList(props) {
	const slug = props.slug;
	const currentUser = props.currentUser;
	const comments = props.comments;

	return (
		comments
			?
			<div>
				{
					comments.map(comment => {
						return (
							<Comment
								comment={comment}
								currentUser={currentUser}
								slug={slug}
								key={comment.id} />
						)
					})
				}
			</div>
			: null
	)
}
