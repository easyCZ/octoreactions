const ISSUE_HEADER_CONTAINER = '.gh-header-meta'
const ISSUE_HEADER_ROW = '.flex-table-item-primary'


class View {

  getPlusElement(count) {
    return `
      <span class="${OCTOREACTIONS_CONTAINER}">
        ${GITHUB_PLUS}
        ${count}
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

class IssueList extends View {}
