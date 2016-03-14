const initialState = {
  owner: null,
  repository: null,
  issueId: null
}


class Octoreactions {

  constructor(state=initialState, chromeStorage) {
    this.state = state;
    this.storage = chromeStorage.local;

    this.updateState();
    this.render();
  }

  updateState(pathname=window.location.pathname) {
    let [_, owner, repo, issues, issueId] = pathname.split('/')
    this.state = Object.assign({}, this.state, {owner, repo, issueId})
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
    const namespace = `${owner}:${repo}`;

    console.log('namespace', namespace);
    const deferred = jQuery.Deferred();
    this.storage.get(namespace, (res) => {
      console.log('Store', res);
      if (namespace in res && issueId in res[namespace]) {
        console.log('[Octoreactions] Getting from store: ', res[namespace][issueId])
        return deferred.resolve(res[namespace][issueId])
      }
      return deferred.reject();
    })

    return deferred;
  }

  setReactionsToStore(owner, repo, issueId, reactions) {
    const namespace = `${owner}:${repo}`;
    let toStore = {};
    toStore[namespace] = {};
    toStore[namespace][issueId] = reactions;
    this.storage.set(toStore)
  }

}
