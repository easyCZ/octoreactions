const STORAGE_NAMESPACE = 'octoreactions';


class Storage {

  getKey(owner, repo) {
    return `${STORAGE_NAMESPACE}:${owner}:${repo}`;
  }

  get(key) {
    return JSON.parse(localStorage.getItem(key))
  }

  set(key, value) {
    const encoded = JSON.stringify(value);
    return localStorage.setItem(key, encoded);
  }

  setIssue(owner, repo, issueId, value) {
    const key = this.getKey(owner, repo)
    let current = this.get(key);

    if (!current) current = {};

    current[issueId] = value;
    this.set(key, current);
  }

  getIssue(owner, repo, issueId) {
    const key = this.getKey(owner, repo);
    const value = this.get(key);

    if (value && issueId in value) return value[issueId];
  }

}
