import { SET_REACTIONS } from './constants.js';

export function setReactions(key, reactions, timestamp=Date.now()) {
  return {
    type: SET_REACTIONS,
    key,
    payload: Object.assign({}, reactions, { timestamp }),
  }
}