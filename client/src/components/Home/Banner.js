import React from 'react'

export default function Banner(props) {
	const appName = props.appName;
	const token = props.token;

	return (
		!token
			?
			<div className="banner">
				<div className="container">
					<h1 className="logo-font">
						{appName.toLowerCase()}
					</h1>
					<p>A place to share your knowledge.</p>
				</div>
			</div>
			: null
	)
}
