import React from 'react'

export default function ListErrors(props) {
	const errors = props.errors;

	return (
		errors
			?
			<ul className="error-messages">
				{
					errors.map((error, index) =>
						<li key={index}>
							{error}
						</li>
					)
				}
			</ul>
			: null
	)
}
