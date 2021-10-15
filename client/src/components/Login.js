import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import agent from '../agent';
import { LOGIN, LOGIN_PAGE_UNLOADED } from '../constants/actionTypes';
import { store } from '../store';
import ListErrors from './ListErrors';

export default function Login() {
	const auth = useSelector(state => state.auth);

	const onSubmit = (email, password) => {
		const payload = agent.Auth.login(email, password);
		store.dispatch({ type: LOGIN, payload });
	}

	const onUnload = () => store.dispatch({ type: LOGIN_PAGE_UNLOADED });

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const changeEmail = e => setEmail(e.target.value);
	const changePassword = e => setPassword(e.target.value);

	const submitForm = e => {
		e.preventDefault();
		onSubmit(email, password);
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
						<h1 className="text-xs-center">Sign In</h1>

						<p className="text-xs-center">
							<Link to="/register">Need an account?</Link>
						</p>

						<ListErrors errors={auth.errors} />

						<form onSubmit={submitForm}>
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
								Sign in
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
