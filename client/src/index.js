import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { store } from './store';
import App from './components/App';

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Switch>
				<Route path="/" component={App} />
			</Switch>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
