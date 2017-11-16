import { persistStore, persistCombineReducers } from 'redux-persist';
// import storage from 'redux-persist/es/storage'; // default: localStorage if web, AsyncStorage if react-native
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  /* eslint-disable no-underscore-dangle */
  const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(sagaMiddleware),
  );
  /* eslint-enable */
  sagaMiddleware.run(rootSaga);

  const persistor = persistStore(store);

  return { store, persistor };
}
