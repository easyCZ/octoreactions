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
  console.log(user, repo, issue);

  if (isIssueDetailView(location)) {



  }

  else if (isIssueListView(location)) {

  }

})(store)


export {
  loadLocalStorage,
  octoreactions
}