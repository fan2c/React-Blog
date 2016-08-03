import 'babel-core/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import configureStore from './store/configureStore';
import routes from './routes';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import {loginUserSuccess} from './actions/auth';

injectTapEventPlugin();
const store = configureStore(window.__INITIAL_STATE__);
const history = syncHistoryWithStore(browserHistory, store);


let token = localStorage.getItem('token');
if (token !== null) {
    store.dispatch(loginUserSuccess(token));
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            {routes}
        </Router>
    </Provider>,
    document.getElementById('root')
);
