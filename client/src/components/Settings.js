import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import agent from '../agent';
import { LOGOUT, SETTINGS_PAGE_UNLOADED, SETTINGS_SAVED } from '../constants/actionTypes';
import { store } from '../store';
import ListErrors from './ListErrors';

export default function Settings() {
	const settings = useSelector(state => state.settings);
	const currentUser = useSelector(state => state.common.currentUser);

	const [user, setUser] = useState({
		image: '',
		username: '',
		bio: '',
		email: '',
		password: ''
	});

	const changeImage = e => setUser({ ...user, image: e.target.value });
	const changeUsername = e => setUser({ ...user, username: e.target.value });
	const changeBio = e => setUser({ ...user, bio: e.target.value });
	const changeEmail = e => setUser({ ...user, email: e.target.value });
	const changePassword = e => setUser({ ...user, password: e.target.value });

	const submitForm = e => {
		e.preventDefault();
		store.dispatch({ type: SETTINGS_SAVED, payload: agent.Auth.save(user) });
	}

	const onClickLogout = () => store.dispatch({ type: LOGOUT, payload: agent.Auth.logout() });
	const onUnload = () => store.dispatch({ type: SETTINGS_PAGE_UNLOADED });

	useEffect(() => {
		if (currentUser) {
			setUser(currentUser);
		}
	}, [currentUser]);

	useEffect(() => {
		return () => {
			onUnload();
		}
	}, []);

	return (
		<div className="settings-page">
			<div className="container page">
				<div className="row">
					<div className="col-md-6 offset-md-3 col-xs-12">
						<h1 className="text-xs-center">Your Settings</h1>

						<ListErrors errors={settings.errors} />

						<form onSubmit={submitForm}>
							<fieldset>
								<fieldset className="form-group">
									<input
										className="form-control form-control-lg"
										type="email"
										placeholder="Email"
										readOnly
										value={user.email || ''}
										onChange={changeEmail} />
								</fieldset>

								<fieldset className="form-group">
									<input
										className="form-control form-control-lg"
										type="text"
										placeholder="Username"
										value={user.username || ''}
										onChange={changeUsername} />
								</fieldset>

								<fieldset className="form-group">
									<input
										className="form-control"
										type="text"
										placeholder="URL of profile picture"
										value={user.image || ''}
										onChange={changeImage} />
								</fieldset>


								<fieldset className="form-group">
									<textarea
										className="form-control form-control-lg"
										rows="8"
										placeholder="Short bio about you"
										value={user.bio || ''}
										onChange={changeBio}>
									</textarea>
								</fieldset>

								<fieldset className="form-group">
									<input
										className="form-control form-control-lg"
										type="password"
										placeholder="New Password"
										value={user.password || ''}
										onChange={changePassword} />
								</fieldset>

								<button
									className="btn btn-lg btn-primary pull-xs-right"
									type="submit"
									disabled={settings.inProgress}>
									Update Settings
								</button>
							</fieldset>
						</form>

						<hr />

						<button
							className="btn btn-outline-danger"
							onClick={onClickLogout}>
							Or click here to logout
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
