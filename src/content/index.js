import { store, loadLocalStorage } from './storage'
import * as constants from './constants'
import {
  getIdentifiers,
  isIssueListView,
  isIssueDetailView,
  getKey
} from './util.js'
import { parseIssue } from './parser.js';
import { setReactions } from './actions.js';


function getIssueReactions(reactionsStore, key, expiration) {
  let reactions = reactionsStore[key];

  if (reactions) {
    const { timestamp } = reactions;
    const now = Date.now();
    if (timestamp + expiration * 60 * 1000 < now) {
      return Promise.reject()
    }
  }
  return reactions
    ? Promise.resolve(reactions)
    : Promise.reject()
}


/* Octoreactions entry
 *
 * @param {string} URL Location Pathname
 */
const octoreactions = ((store) => (location) => {
  const { user, repo, issue } = getIdentifiers(location)
  const reactionsStore = store.getState().reactions;

  if (isIssueDetailView(location)) {

    const key = getKey(user, repo, issue)

    getIssueReactions(reactionsStore, key, store.getState().settings.cache)
      .then(r => r, () => {
        console.log('parsing');
        const reactions = setReactions(key, parseIssue(document));
        store.dispatch(reactions)
        return reactions.payload;
      })
      .then(reactions => {
        // TODO: Render reactions
        console.log('reactions', reactions);
      })
      .catch(err => console.error(err));


  }

  else if (isIssueListView(location)) {
    console.log(user, repo);

  }

})(store)


export {
  loadLocalStorage,
  octoreactions
}