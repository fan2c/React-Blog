import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import createLogger from 'redux-logger';

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunkMiddleware, createLogger())
    );

    if (module.hot) {
        module.hot
            .accept('../reducers', () => {
                const nextRootReducer = require('../reducers/index');
                store.replaceReducer(nextRootReducer);
            });
    }

    return store;

}
