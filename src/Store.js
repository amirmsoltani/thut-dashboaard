import {createStore, applyMiddleware, compose} from "redux";
import {createLogger} from "redux-logger";
import Reducer, {initialState} from './Reducers';
import CreateSaga from "redux-saga";
import Saga from "./Sagas";


function configureStore(initial = initialState) {
    const middleware = [];
    const saga = CreateSaga();
    middleware.push(saga);
    //******************
    //logger middleware
    if (process.env.NODE_ENV === "development" && process.browser) {
        middleware.push(createLogger());
    }
    //******************

    const store = createStore(Reducer, initial, compose(applyMiddleware(...middleware)));
    store.sagaTask = saga.run(Saga);
    return store
}

export default configureStore;