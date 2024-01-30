import {
   legacy_createStore as createStore,
    applyMiddleware
} from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import {
    composeWithDevTools
} from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import {
    index_saga
} from './Admin-saga/saga';

const SagaMiddleware = createSagaMiddleware()

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(SagaMiddleware))
)
SagaMiddleware.run(index_saga);


export default store;