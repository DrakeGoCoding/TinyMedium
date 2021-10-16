import React from 'react'
import agent from '../agent';
import { SET_PAGE } from '../constants/actionTypes';
import { store } from '../store';

export default function ListPagination(props) {
	if (props.articlesCount <= 10) {
		return null;
	}

	const range = [];
	for (let i = 0; i < Math.ceil(props.articlesCount / 10); i++) {
		range.push(i);
	}

	const onSetPage = (page, payload) => {
		store.dispatch({ type: SET_PAGE, page, payload });
	}

	const setPage = page => {
		if (props.pager) {
			onSetPage(page, props.pager(page));
		} else {
			onSetPage(page, agent.Articles.all(page));
		}
	}

	return (
		<nav>
			<ul className="pagination">
				{
					range.map(v => {
						const isCurrent = v === props.currentPage;
						const onClick = e => {
							e.preventDefault();
							setPage(v);
						};
						return (
							<li
								className={isCurrent ? 'page-item active' : 'page-item'}
								onClick={onClick}
								key={v.toString()}>
								<a className="page-link" href="/">{v + 1}</a>
							</li>
						)
					})
				}
			</ul>
		</nav>
	)
}
