import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ListErrors from './ListErrors';

export default function Settings() {
	const settings = useSelector(state => state.settings);

	const [image, setImage] = useState('');
	const [username, setUsername] = useState('');
	const [bio, setBio] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const changeImage = e => setImage(e.target.value);
	const changeUsername = e => setUsername(e.target.value);
	const changeBio = e => setBio(e.target.value);
	const changeEmail = e => setEmail(e.target.value);
	const changePassword = e => setPassword(e.target.value);

	const submitForm = e => {
		e.preventDefault();
	}

	return (
		<div className="settings-page">
			<div className="container page">
				<div className="row">
					<div className="col-md-6 offset-md-3 col-xs-12">
						<h1 className="text-xs-center">Your Settings</h1>

						<ListErrors errors={settings.errors} />

						<form onSubmit={submitForm}>
							<fieldset className="form-group">
								<input
									className="form-control"
									type="text"
									placeholder="URL of profile picture"
									value={image}
									onChange={changeImage} />
							</fieldset>

							<fieldset className="form-group">
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder="Username"
									value={username}
									onChange={changeUsername} />
							</fieldset>

							<fieldset className="form-group">
								<textarea
									className="form-control form-control-lg"
									rows="8"
									placeholder="Short bio about you"
									value={bio}
									onChange={changeBio}>
								</textarea>
							</fieldset>

							<fieldset className="form-group">
								<input
									className="form-control form-control-lg"
									type="email"
									placeholder="Email"
									value={email}
									onChange={changeEmail} />
							</fieldset>

							<fieldset className="form-group">
								<input
									className="form-control form-control-lg"
									type="password"
									placeholder="New Password"
									value={password}
									onChange={changePassword} />
							</fieldset>

							<button
								className="btn btn-lg btn-primary pull-xs-right"
								type="submit"
								disabled={settings.inProgress}>
								Update Settings
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
