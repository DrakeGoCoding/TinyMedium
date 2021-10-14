import React from 'react'

export default function Tags(props) {
	const tags = props.tags;

	const handleTagClick = (e, tag) => {
		e.preventDefault();
	}

	return (
		tags
			?
			<div className="tag-list">
				{
					tags.length > 0
						?
						tags.map(tag =>
							<a
								href="/"
								className="tag-default tag-pill"
								key={tag}
								onClick={handleTagClick}>
								{tag}
							</a>
						)
						: "No tags are here... yet."
				}
			</div>
			:
			<div>Loading Tags...</div>
	)
}
