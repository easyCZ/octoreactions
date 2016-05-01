
/* Parse the user, repository and issue from the url pathname
 *
 * @param {string} pathname - URL Pathname
 * @returns {{user: string, repo: string, issue: number}}
 */
export function getIdentifiers(pathname) {
  let [user, repo, _, issue] = pathname.split('/').slice(1)
  if (issue) {
    issue = issue.replace(/#.*/, '')  // Remove all after hash
    issue = parseInt(issue)
  }

  return { user, repo, issue }
}


/* Determine if the pathname is a Github Issues List View
 *
 * @param {string} pathname - URL pathname
 * @returns {bool}
 */
export function isIssueListView(pathname) {
  return pathname.split('/').slice(1).length === 3
}


/* Determine if the pathname is a Github Issues Detail View
 *
 * @param {string} pathname - URL pathname
 * @returns {bool}
 */
export function isIssueDetailView(pathname) {
  return pathname.split('/').slice(1).length === 4
}