import * as storage from 'redux-storage';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import * as reducers from './reducers';
import createLocalStorageEngine from 'redux-storage-engine-localstorage';


const reducer = storage.reducer(combineReducers(reducers));
const localStorageEngine = createLocalStorageEngine('octoreactions')

const middlewares = [
  storage.createMiddleware(localStorageEngine),

  // TODO: Remove outside DEV
  // Logger needs to be last middleware
  require('redux-logger')()
]

const store = applyMiddleware(...middlewares)(createStore)(reducer);
const loadLocalStorage = storage.createLoader(localStorageEngine).bind(null, store);

export {
  store,
  loadLocalStorage
}