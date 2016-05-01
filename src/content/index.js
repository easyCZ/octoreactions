import { store, loadLocalStorage } from './storage'
import * as constants from './constants'
import {
  getIdentifiers,
  isIssueListView,
  isIssueDetailView
} from './util.js'


export const octoreactions = ((store) => (location) => {
  const { user, repo, issue } = getIdentifiers(location)
  console.log(user, repo, issue);
})(store)


export {
  loadLocalStorage
}