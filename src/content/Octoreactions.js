const initialState = {
  owner: null,
  repository: null,
  issueId: null
}


class Octoreactions {

  constructor(state=initialState) {
    this.state = state;

    this.storage = new Storage();

    this.updateState();
    this.render();
  }

  updateState(pathname=window.location.pathname) {
    let [_, owner, repo, issues, issueId] = pathname.split('/')
    this.state = Object.assign({}, this.state, {owner, repo, issueId})
  }

  updateAndRender() {
    this.updateState();
    this.render();
  }

  render() {
    const state = this.state;
    const isIssueList = !state.issueId;
    const self = this;

    if (isIssueList) {

      const issues = Parser.getIssues($(document));
      const {owner, repo} = this.state;

      issues.forEach(({id, $issue}) => {
        this.getReactionsFromStore(owner, repo, id)
          .then(r => r, () => Async.getIssueDOM(owner, repo, id)
            .then(dom => {
              let reactions = Parser.parseIssueDetail($(dom));
              self.storage.setIssue(owner, repo, id, reactions)
              return jQuery.Deferred().resolve(reactions)
            })
          )
          .then(reactions => IssueList.render(reactions, $issue))
      })


    }
    else {
      const {owner, repo, issueId} = this.state;
      this.getReactionsFromStore(owner, repo, issueId)
        .then(r => r, () => {
          let reactions = Parser.parseIssueDetail($(document));
          this.storage.setIssue(owner, repo, issueId, reactions)
          return jQuery.Deferred().resolve(reactions)
        })
        .then(reactions => IssueDetail.render(reactions))
    }
  }

  getReactionsFromStore(owner, repo, issueId) {
    const reactions = this.storage.getIssue(owner, repo, issueId)
    return reactions
      ? jQuery.Deferred().resolve(reactions)
      : jQuery.Deferred().reject();
  }

}
