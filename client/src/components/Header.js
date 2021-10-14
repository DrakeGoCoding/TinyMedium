import React from 'react'
import { Link } from 'react-router-dom';
import defaultAvatar from '../assets/defaultAvatar.jpeg';

function LoggedOutView() {
	return (
		<ul className="nav navbar-nav pull-xs-right">
			<li className="nav-item">
				<Link to="/" className="nav-link">
					Home
				</Link>
			</li>

			<li className="nav-item">
				<Link to="/login" className="nav-link">
					Sign in
				</Link>
			</li>

			<li className="nav-item">
				<Link to="/register" className="nav-link">
					Sign up
				</Link>
			</li>
		</ul>
	);
}

function LoggedInView(props) {
	const currentUser = props.currentUser;

	return (
		<ul className="nav navbar-nav pull-xs-right">
			<li className="nav-item">
				<Link to="/" className="nav-link">
					Home
				</Link>
			</li>

			<li className="nav-item">
				<Link to="/editor" className="nav-link">
					<i className="ion-compose"></i>&nbsp;New Post
				</Link>
			</li>

			<li className="nav-item">
				<Link to="/settings" className="nav-link">
					<i className="ion-gear-a"></i>&nbsp;Settings
				</Link>
			</li>

			<li className="nav-item">
				<Link
					to={`/@${currentUser.username}`}
					className="nav-link">
					<img src={currentUser.image || defaultAvatar} className="user-pic" alt={props.currentUser.username} />
					{currentUser.username}
				</Link>
			</li>
		</ul>
	);
}

export default function Header(props) {
	const appName = props.appName.toLowerCase();
	const currentUser = props.currentUser;

	return (
		<nav className="navbar navbar-light">
			<div className="container">
				<Link to="/" className="navbar-brand">
					{appName}
				</Link>

				{
					currentUser
						? <LoggedInView currentUser={currentUser} />
						: <LoggedOutView currentUser={currentUser} />
				}
			</div>
		</nav>
	)
}
