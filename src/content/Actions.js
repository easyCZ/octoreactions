import { SET_REACTIONS } from './constants.js';

export function setReactions(key, reactions, timestamp=Date.now()) {
  return {
    type: SET_REACTIONS,
    payload: Object.assign({}, reactions, { timestamp }),
  }
}