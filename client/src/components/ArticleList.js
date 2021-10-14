import React from 'react'
import ArticlePreview from './ArticlePreview';
import ListPagination from './ListPagination';

export default function ArticleList(props) {
	const articles = props.articles;

	return (
		articles
			?
			articles.length === 0
				?
				<div className="article-preview">No articles are here... yet</div>
				:
				<div>
					{
						articles.map(article =>
							<ArticlePreview article={article} key={article.slug} />
						)
					}

					<ListPagination
						pager={props.pager}
						articlesCount={props.articlesCount}
						currentPage={props.currentPage} />
				</div>
			:
			<div className="article-preview">Loading...</div>
	)
}
