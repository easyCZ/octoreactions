import { store, loadLocalStorage } from './storage'
import * as constants from './constants'
import {
  getIdentifiers,
  isIssueListView,
  isIssueDetailView
} from './util.js'


/* Octoreactions entry
 *
 * @param {string} URL Location Pathname
 */
const octoreactions = ((store) => (location) => {
  const { user, repo, issue } = getIdentifiers(location)


  if (isIssueDetailView(location)) {
    console.log(user, repo, issue);


  }

  else if (isIssueListView(location)) {
    console.log(user, repo);

  }

})(store)


export {
  loadLocalStorage,
  octoreactions
}