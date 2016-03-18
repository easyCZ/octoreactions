const REACTIONS_DEFAULT = {
  plus: true,
  minus: false,
  heart: false,
  smile: false,
  tada: false,
  thinking: false
}

const CACHE_DEFAULT = 10
const DEFAULT_SETTINGS = {
  reactions: REACTIONS_DEFAULT,
  cache: CACHE_DEFAULT
}

const initialState = {
  owner: null,
  repo: null,
  issueId: null,
  settings: DEFAULT_SETTINGS
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

  setSettings(settings=DEFAULT_SETTINGS) {
    this.state = Object.assign({}, this.state, settings);
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

      issues.forEach(({id, issue}) => {
        this.getReactionsFromStore(owner, repo, id)
          .then(r => r, () => Async.getIssueDOM(owner, repo, id)
            .then(dom => {
              let reactions = Parser.getReactions($(dom));
              self.storage.setIssue(owner, repo, id, reactions)
              return new Promise(resolve => resolve(reactions));
            })
          )
          .then(reactions => IssueList.render(reactions, issue))
      })


    }
    else {
      const {owner, repo, issueId} = this.state;
      this.getReactionsFromStore(owner, repo, issueId)
        .then(r => r, () => {
          let reactions = Parser.getReactions($(document));
          this.storage.setIssue(owner, repo, issueId, reactions)
          return new Promise(resolve => resolve(reactions));
        })
        .then(reactions => IssueDetail.render(reactions))
    }
  }

  getReactionsFromStore(owner, repo, issueId) {
    return new Promise((resolve, reject) => {
      const reactions = this.storage.getIssue(owner, repo, issueId);
      return reactions ? resolve(reactions) : reject();
    })
  }

}
