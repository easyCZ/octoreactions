const initialState = {
  owner: null,
  repository: null,
  issueId: null
}


class Octoreactions {

  constructor(state=initialState) {
    this.state = state;

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

    if (isIssueList) {

      const issues = Parser.getIssues($(document));
      const {owner, repo} = this.state;

      issues.forEach(({id, $issue}) => {
        this.getReactionsFromStore(owner, repo, id)
          .then(r => r, () => Async.getIssueDOM(owner, repo, id)
            .then(dom => {
              let reactions = Parser.parseIssueDetail($(dom));
              this.setReactionsToStore(owner, repo, id, reactions)
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
          this.setReactionsToStore(owner, repo, issueId, reactions)
          return jQuery.Deferred().resolve(reactions)
        })
        .then(reactions => IssueDetail.render(reactions))
    }
  }

  getReactionsFromStore(owner, repo, issueId) {
    const namespace = `${STORAGE}:${owner}:${repo}`;

    const deferred = jQuery.Deferred();

    debugger;
    try {
      const item = JSON.parse(localStorage.getItem(namespace))
      if (issueId in item[namespace]) return deferred.resolve(item[namespace][issueId])
      return deferred.reject()
    }
    catch (e) {
      return deferred.reject()
    }

    return deferred;
  }

  setReactionsToStore(owner, repo, issueId, reactions) {
    const namespace = `${STORAGE}:${owner}:${repo}`;

    Storage.setIssue(namespace, issueId, reactions)

    try {
      let stored = JSON.parse(localStorage.getItem(namespace));
      if (!stored) {
        stored = {};
        stored[namespace] = {};
      }
      stored[namespace][issueId] = reactions;
      localStorage.setItem(namespace, JSON.stringify(stored));
    }
    catch (e) {

    }
  }

}
