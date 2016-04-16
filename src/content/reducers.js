import { combineReducers } from 'redux';
import { reducer as storageReducer } from 'redux-storage';
import R from 'ramda';


export default R.compose(storageReducer, combineReducers)({
  // Reducers go here
})
