import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import createSagaMiddleware from "redux-saga";

import projectsReducer from "./reducer";
import rootSaga from "./sagas";

const rootReducer = combineReducers({
  projects: projectsReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;
export default store;
