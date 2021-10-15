import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import agent from '../agent';
import { ADD_TAG, ARTICLE_SUBMITTED, EDITOR_PAGE_LOADED, EDITOR_PAGE_UNLOADED, REMOVE_TAG, UPDATE_FIELD_EDITOR } from '../constants/actionTypes'
import { store } from '../store'
import ListErrors from './ListErrors';

export default function Editor() {
	const { slug } = useParams();

	const editor = useSelector(state => state.editor);
	const onLoad = (payload) => store.dispatch({ type: EDITOR_PAGE_LOADED, payload });
	const onUnload = () => store.dispatch({ type: EDITOR_PAGE_UNLOADED });
	const onUpdateField = (key, value) => store.dispatch({ type: UPDATE_FIELD_EDITOR, key, value });

	const changeTitle = e => onUpdateField('title', e.target.value);
	const changeDescription = e => onUpdateField('description', e.target.value);
	const changeBody = e => onUpdateField('body', e.target.value);

	const [tagInput, setTagInput] = useState('');
	const changeTagInput = e => setTagInput(e.target.value);

	const addTag = (tag) => {
		if (!editor.tagList.includes(tag)) {
			store.dispatch({ type: ADD_TAG, tag });
		}
	}
	const removeTag = (tag) => {
		store.dispatch({ type: REMOVE_TAG, tag });
	}

	const watchForEnter = e => {
		if (e.keyCode === 13) {
			e.preventDefault();
			if (tagInput.trim().length > 0) {
				addTag(tagInput);
			}
			setTagInput('');
		}
	}

	const submitForm = e => {
		e.preventDefault();
		const article = {
			title: editor.title,
			description: editor.description,
			body: editor.body,
			tagList: editor.tagList
		};

		console.log(article);

		store.dispatch({
			type: ARTICLE_SUBMITTED,
			payload: editor.slug
				? agent.Articles.update(Object.assign(article, { slug: editor.slug }))
				: agent.Articles.create(article)
		});
	}

	useEffect(() => {
		onLoad(slug ? agent.Articles.bySlug(slug) : null);
	}, [slug])

	useEffect(() => {
		return () => {
			onUnload();
		}
	}, []);

	return (
		<div className="editor-page">
			<div className="container page">
				<div className="row">
					<div className="col-md-10 offset-md-1 col-xs-12">
						<ListErrors errors={editor.errors} />

						<form>
							<fieldset>
								<fieldset className="form-group">
									<input
										className="form-control form-control-lg"
										type="text"
										placeholder="Article Title"
										value={editor.title || ''}
										onChange={changeTitle} />
								</fieldset>

								<fieldset className="form-group">
									<input
										className="form-control"
										type="text"
										placeholder="What's this article about?"
										value={editor.description || ''}
										onChange={changeDescription} />
								</fieldset>

								<fieldset className="form-group">
									<textarea
										className="form-control"
										rows="8"
										placeholder="Write your article (in markdown)"
										value={editor.body || ''}
										onChange={changeBody}>
									</textarea>
								</fieldset>

								<fieldset className="form-group">
									<input
										className="form-control"
										type="text"
										placeholder="Enter tags"
										value={tagInput}
										onChange={changeTagInput}
										onKeyUp={watchForEnter} />

									<div className="tag-list">
										{
											(editor.tagList || []).map(tag => {
												return (
													<span className="tag-default tag-pill" key={tag}>
														<i className="ion-close-round"
															onClick={() => removeTag(tag)}>
														</i>
														{tag}
													</span>
												);
											})
										}
									</div>
								</fieldset>

								<button
									className="btn btn-lg pull-xs-right btn-primary"
									type="button"
									disabled={editor.inProgress}
									onClick={submitForm}>
									Publish Article
								</button>
							</fieldset>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
