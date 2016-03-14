const ISSUE_HEADER_CONTAINER = '.gh-header-meta'
const ISSUE_HEADER_ROW = '.flex-table-item-primary'


class View {

  getPlusElement(count) {
    return `
      <span class="${OCTOREACTIONS_CLASS}">
        ${GITHUB_PLUS}
        <span class="${OCTOREACTIONS_COUNT_CLASS}">${count}</span>
      </span>
    `
  }

  shouldRender() { return false; }

}

class IssueDetail extends View {

  parse(dom) {
    var $html = $(dom),
        containers = $html.find('.comment-reactions-options');

    var pluses = 0;
    containers.each(function (index, container) {
      var tokens = $(container).find(PLUS_SELECTOR).text().trim().split(' ');
      return pluses += +tokens[tokens.length - 1]
    })

    return pluses;
  }

  render(plusCount=10) {

    Async.getIssueDOM('easyCZ', 'octoreactions', '1').then((dom) => {
      const pluses = this.parse(dom);

      const $issueHeader = $(`${ISSUE_HEADER_CONTAINER} ${ISSUE_HEADER_ROW}`);
      const $octoreactions = $(OCTOREACTIONS_CONTAINER);

      // TODO: Handle more gracefully if exists
      $octoreactions.remove();

      $issueHeader.append(this.getPlusElement(pluses));
    })


  }

  shouldRender() {
    return window.location.pathname.match(/(\w|\/)*issues\/\d/)
  }

}

class IssueList extends View {

  getIssues() {
    return $('.table-list-issues li');
  }

  getIssueId($issue) {
    const tokens = $issue.find('a').last().attr('href').split('/');
    return +tokens[tokens.length - 1];
  }

  renderCountToIssue($issue, count) {
    const $commentsContainer = $issue.find('.issue-comments');
    const octoreactions = $commentsContainer.find(OCTOREACTIONS_CONTAINER);

    octoreactions.remove();

    $commentsContainer.append(this.getPlusElement(count));
  }

  render() {
    const issueDetail = new IssueDetail();
    const $issues = this.getIssues();

    $issues.each((i, issue) => {
      const $issue = $(issue);
      const issueId = this.getIssueId($issue);

      Async.getIssueDOM('easyCZ', 'octoreactions', issueId).then(dom => {

        const pluses = issueDetail.parse(dom);

        this.renderCountToIssue($issue, pluses);
      })
    })

    console.log('rendering');
  }

  shouldRender() {
    return window.location.pathname.match(/^(\w|\/)*issues$/);
  }


}
