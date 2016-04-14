
class Async {

  static getIssueDOM(owner, repo, issueId) {
    const url = `https://github.com/${owner}/${repo}/issues/${issueId}`
    console.debug('[Octoreactions] Requesting url: ' + url)
    return $.get(url)
  }

}