
class Async {

  static getIssueDOM(owner, repo, issueId) {
    const url = `https://github.com/${owner}/${repo}/issues/${issueId}`
    return $.get(url)
  }

}