
const getIssueUrl = (owner, repo, issueId) => `https://github.com/${owner}/${repo}/issues/${issueId ? issueId : ''}`


class Async {

  static getIssueDOM(owner, repo, issueId=null) {
    const url = getIssueUrl(owner, repo, issueId)
    return $.get(url)
  }


}