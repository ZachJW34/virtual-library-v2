import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import * as authActions from '../actions/auth';
import { history } from '../reducers/history';
import { rootReducer } from '../reducers';

export const configureStore = () => {
    const middleWare = [];
    const enhancers = [];
    const actionCreators = {
      ...authActions
    };

    middleWare.push(thunk);
    middleWare.push(routerMiddleware(history));

    let global: any = window;

    const composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
      actionCreators,
    })
    : compose;

    enhancers.push(applyMiddleware(...middleWare));
    const enhancer = composeEnhancers(...enhancers);

    const store = createStore(rootReducer, enhancer);

    return store;
}