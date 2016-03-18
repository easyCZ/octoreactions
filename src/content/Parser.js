const REACTIONS_CONTAINER = '.comment-reactions-options'
const ISSUES_SELECTOR = '.table-list-issues li';

const DEFAULT_REACTION_COUNTS = {
  '+1': 0, heart: 0, '-1': 0, smile: 0, thinking_face: 0, tada: 0
}

const sumObjects = (a, b, init=0) => {
  Object.keys(b).forEach(key => {
    if (!a.hasOwnProperty(key)) a[key] = init;
    a[key] += b[key];
  })
  return Object.assign({}, a);
}


class Parser {

  static getReactionsContainers($dom) {
    return $dom.find(REACTIONS_CONTAINER)
  }

  static getReactionsCountsFromContainer($reactionsContainer) {
    // Reactions are all the button children of the container
    return [].map.call($reactionsContainer.children, (reactionButton) => {

      // The value attribute contains the reaction type
      const reactionType = Parser.getReactionType(reactionButton);
      const reactionValue = Parser.getReactionValue(reactionButton);

      return { [reactionType]: reactionValue }
    })
    .reduce(sumObjects, Object.assign({}, DEFAULT_REACTION_COUNTS))
  }

  static getReactionType(reactionButton) {
    return reactionButton.value.split(' ')[0];
  }

  static getReactionValue(reactionButton) {
    return +reactionButton.textContent.trim().split(' ').pop();
  }

  static getReactions($dom) {
    return []
      .map.call(Parser.getReactionsContainers($dom), $container => Parser.getReactionsCountsFromContainer($container))
      .reduce(sumObjects, Object.assign({}, DEFAULT_REACTION_COUNTS))
  }

  static getIssues($dom) {
    let issues = [];
    $dom.find(ISSUES_SELECTOR).each((i, issue) => {
      const href = issue.getElementsByClassName('issue-title-link')[0].href;
      issues.push({
        id: +href.split('/').pop(),
        issue
      })
    })

    return issues;
  }

}

//removeIf(test)
export default Parser;
//endRemoveIf(test)
