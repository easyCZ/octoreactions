const ISSUE_HEADER_CONTAINER = '.gh-header-meta'
const ISSUE_HEADER_ROW = '.flex-table-item-primary'


class View {

  static getPlusElement(count) {
    return `
      <span class="${OCTOREACTIONS_CLASS}">
        ${GITHUB_PLUS}
        <span class="${OCTOREACTIONS_COUNT_CLASS}">${count}</span>
      </span>
    `
  }

}

class IssueDetail extends View {

  static render(reactions) {

    const $issueHeader = $(`${ISSUE_HEADER_CONTAINER} ${ISSUE_HEADER_ROW}`);
    const $octoreactions = $(OCTOREACTIONS_CONTAINER);

    // TODO: Handle more gracefully if exists
    $octoreactions.remove();

    $issueHeader.append(View.getPlusElement(reactions['+1']));
  }


}

class IssueList extends View {

  static render(reactions, $issue) {
    debugger;
    const $commentsContainer = $($issue).find('.issue-comments');
    const octoreactions = $commentsContainer.find(OCTOREACTIONS_CONTAINER);

    octoreactions.remove();

    $commentsContainer.append(View.getPlusElement(reactions['+1']));
  }

}
