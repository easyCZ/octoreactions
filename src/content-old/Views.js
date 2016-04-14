const ISSUE_HEADER_CONTAINER = '.gh-header-meta'
const ISSUE_HEADER_ROW = '.flex-table-item-primary'

const REACTION_TO_EMOTICON = {
  '+1': GITHUB_PLUS,
  heart: GITHUB_HEART,
  '-1': GITHUB_MINUS,
  smile: GITHUB_SMILE,
  thinking_face: GITHUB_THINKING,
  tada: GITHUB_TADA
}


class View {

  static getEmoticon(type) {
    return REACTION_TO_EMOTICON[type];
  }

  static getPlusElement(count) {
    return View.getCountElement('+1', count);
  }

  static getCountElement(type, count) {
    return `
      <span class="${OCTOREACTIONS_CLASS}">
        ${View.getEmoticon(type)}
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

    Object.keys(reactions).forEach(type => {
      const elem = View.getCountElement(type, reactions[type]);
      $issueHeader.append(elem);
    })
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
