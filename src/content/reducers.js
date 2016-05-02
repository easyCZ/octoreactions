import { combineReducers } from 'redux';


export function reactions(state={}, action) {

  return state;

}

const DEFAULT_SETTINGS = {
  cache: 10,
  reactions: ['+1']
}

export function settings(state=DEFAULT_SETTINGS, action) {

  return state;

}