import { store, loadLocalStorage } from './storage'
import * as constants from './constants'
import {
  getIdentifiers,
  isIssueListView,
  isIssueDetailView,
  getKey
} from './util.js'



function getIssueReactions(reactionsStore, user, repo, issue) {
  const key = getKey(user, repo, issue);
  const reactions = reactionsStore[key];

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
  const reactions = store.getState().reactions;

  if (isIssueDetailView(location)) {

    getIssueReactions(reactions, user, repo, issue)
      .then(r => console.log(r));


  }

  else if (isIssueListView(location)) {
    console.log(user, repo);

  }

})(store)


export {
  loadLocalStorage,
  octoreactions
}