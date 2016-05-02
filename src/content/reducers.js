import { SET_REACTIONS } from './constants.js';

export const reactionsDefaultState = {}
export function reactions(state=reactionsDefaultState, action) {

  switch (action.type) {

    case SET_REACTIONS:
      return Object.assign({}, state, { [action.key]: action.payload })

  }

  return state;

}

const DEFAULT_SETTINGS = {
  cache: 10,
  reactions: ['+1']
}

export function settings(state=DEFAULT_SETTINGS, action) {

  return state;

}