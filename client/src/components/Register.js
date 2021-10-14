import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import agent from '../agent';
import { REGISTER, REGISTER_PAGE_UNLOADED } from '../constants/actionTypes';
import { store } from '../store';
import ListErrors from './ListErrors';

export default function Register() {
	const auth = useSelector(state => state.auth);

	const onSubmit = (username, email, password) => {
		const payload = agent.Auth.register(username, email, password);
		store.dispatch({ type: REGISTER, payload });
	}

	const onUnload = () => {
		store.dispatch({ type: REGISTER_PAGE_UNLOADED });
	}

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const changeUsername = e => setUsername(e.target.value);
	const changeEmail = e => setEmail(e.target.value);
	const changePassword = e => setPassword(e.target.value);

	const submitForm = e => {
		e.preventDefault();
		onSubmit(username, email, password);
	}

	useEffect(() => {
		return () => {
			onUnload();
		}
	}, [])

	return (
		<div className="auth-page">
			<div className="container page">
				<div className="row">

					<div className="col-md-6 offset-md-3 col-xs-12">
						<h1 className="text-xs-center">Sign Up</h1>
						<p className="text-xs-center">
							<Link to="/login">Have an account?</Link>
						</p>

						<ListErrors errors={auth.errors} />

						<form onSubmit={submitForm}>
							<fieldset className="form-group">
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder="Username"
									value={username}
									onChange={changeUsername} />
							</fieldset>

							<fieldset className="form-group">
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder="Email"
									value={email}
									onChange={changeEmail} />
							</fieldset>

							<fieldset className="form-group">
								<input
									className="form-control form-control-lg"
									type="password"
									placeholder="Password"
									autoComplete="true"
									value={password}
									onChange={changePassword} />
							</fieldset>

							<button
								className="btn btn-lg btn-primary pull-xs-right"
								type="submit"
								disabled={auth.inProgress}>
								Sign up
							</button>
						</form>
					</div>

				</div>
			</div>
		</div>
	)
}
