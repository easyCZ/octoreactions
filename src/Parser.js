class Parser {

  static parseIssueDetail($dom) {
    let containers = $dom.find('.comment-reactions-options');

    var plus = 0;
    containers.each(function (index, container) {
      var tokens = $(container).find(PLUS_SELECTOR).text().trim().split(' ');
      return plus += +tokens[tokens.length - 1]
    })

    return {plus}
  }

  static getIssues($dom) {
    let issues = [];
    $('.table-list-issues li').each((i, issue) => {
      const $issue = $(issue);
      const tokens = $issue.find('a').last().attr('href').split('/');
      issues.push({
        id: +tokens[tokens.length - 1],
        $issue
      })
    })

    return issues;
  }

}