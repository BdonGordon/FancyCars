import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import { applyMiddleware, compose, createStore, Store } from 'redux';
import makeRootReducer from './reducers';

export function configureStore(initialState?: any): Store<any> {
    const middlewares = [
        thunk, apiMiddleware
    ];

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    let newState = initialState || {};

    const store = createStore(makeRootReducer, newState, composeEnhancers(
        applyMiddleware(...middlewares)
    ));

    return store;
}