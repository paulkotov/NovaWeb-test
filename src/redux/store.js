import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import storage from './middlewares/storage';
import updateComment from './middlewares/updateComment';

const logger = createLogger({
  level: 'info',
  collapsed: true,
});
const middleWares = [thunk, storage, updateComment, logger];
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function createDefaultStore() {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(...middleWares, sagaMiddleware)));
}

export { sagaMiddleware, createDefaultStore };