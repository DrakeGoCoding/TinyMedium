import React from 'react'
import { Link } from 'react-router-dom';
import ListErrors from '../ListErrors';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

export default function CommentContainer(props) {
	const currentUser = props.currentUser;
	const slug = props.slug;
	const comments = props.comments;

	return (
		currentUser
			?
			<div className="col-xs-12 col-md-8 offset-md-2">
				<div>
					<ListErrors errors={props.errors} />
					<CommentInput slug={slug} currentUser={currentUser} />
				</div>

				<CommentList
					comments={comments}
					slug={slug}
					currentUser={currentUser} />
			</div>
			:
			<div className="col-xs-12 col-md-8 offset-md-2">
				<div className="col-xs-12 col-md-8 offset-md-2">
					<p>
						<Link to="/login">Sign in</Link>
						&nbsp;or&nbsp;
						<Link to="/register">sign up</Link>
						&nbsp;to add comments on this article.
					</p>

					<CommentList
						comments={comments}
						slug={slug}
						currentUser={currentUser} />
				</div>
			</div>
	)
}
