'use strict';

var PLUS_SELECTOR = '.reaction-summary-item[value~="+1"]';
var MINUS_SELECTOR = '.reaction-summary-item[value~="-1"]';
var SMILE_SELECTOR = '.reaction-summary-item[value~="smile"]';
var THINKING_SELECTOR = '.reaction-summary-item[value~="thinking_face"]';
var TADA_SELECTOR = '.reaction-summary-item[value~="tada"]';
var HEART_SELECTOR = '.reaction-summary-item[value~="heart"]';

var REACTION_OPTION_SELECTORS = [PLUS_SELECTOR, MINUS_SELECTOR, SMILE_SELECTOR, THINKING_SELECTOR, TADA_SELECTOR, HEART_SELECTOR];

function Octoreactions(owner, repo) {

  this.owner = owner;
  this.repo = repo;

  // this.renderIssue('easyCZ', 'octoreactions', 1)
  // this.getReactions('https://github.com/easyCZ/octoreactions/issues/1', function (count) {
  //   console.log('pluses', count);
  // });

  // var that = this;
  // $('.table-list-issues li').each(function (i, issue) {
  //   debugger;
  //   var links = $(issue).find('.issue-title-link');
  //   var $header = $(issue).find('.issue-comments');

  //   if (links.length === 0) return;

  //   that.get(links.attr('href'), function (success, data) {
  //     var reactions = $(data).find('.reaction-summary-item[value~="+1"]');

  //     $header.append([
  //       '<div class="Octoreactions-Count">',
  //         '<g-emoji class="emoji mr-1" fallback-src="https://assets-cdn.github.com/images/icons/emoji/unicode/1f44d.png">👍</g-emoji>',
  //         '<span>',
  //           reactions.length.toString(),
  //         '</span>',
  //       '</div>'
  //     ].join(''))
  //     // <g-emoji class="emoji mr-1" fallback-src="https://assets-cdn.github.com/images/icons/emoji/unicode/1f44d.png">👍</g-emoji>

  //     console.log('Reactions:', reactions.length);
  //   })
  // })
}

Octoreactions.prototype.getPlus = function () {
  return '<g-emoji class="emoji mr-1" fallback-src="https://assets-cdn.github.com/images/icons/emoji/unicode/1f44d.png">👍</g-emoji>';
};

Octoreactions.prototype.getIssueUrl = function getIssueUrl(owner, repo, issueId) {
  return ['https://github.com/', owner, '/', repo, '/issues/', issueId ? issueId : ''].join('');
};

Octoreactions.prototype.renderIssue = function (issueId) {
  console.log('RenderIssue:', issueId);
  var url = this.getIssueUrl(this.owner, this.repo, issueId);
  var that = this;

  this.getReactions(url, function onGetReactions(count) {
    var $issueHeader = $('.flex-table-item-primary'),
        $octoreactions = $('.Octoreactions-Count');

    $octoreactions.remove();

    $issueHeader.append(['<span class="Octoreactions-Count">', that.getPlus(), count.toString(), '</span>'].join(''));
  });
};

Octoreactions.prototype.renderIssueList = function (owner, repo, issues) {
  issues.forEach(function (issue) {
    var url = this.getIssueUrl(owner, repo, issue);

    this.getReactions(url, function (count) {
      $header.append(['<div class="Octoreactions-Count">', '<g-emoji class="emoji mr-1" fallback-src="https://assets-cdn.github.com/images/icons/emoji/unicode/1f44d.png">👍</g-emoji>', '<span>', reactions.length.toString(), '</span>', '</div>'].join(''));
    });
  }.bind(this));
};

Octoreactions.prototype.getReactions = function getReactions(url, cb) {
  return $.get(url, function onSuccess(data, status, jqxhr) {
    var $html = $(data),
        containers = $html.find('.comment-reactions-options');

    var pluses = 0;
    containers.each(function (index, container) {
      var tokens = $(container).find(PLUS_SELECTOR).text().trim().split(' ');
      return pluses += +tokens[tokens.length - 1];
    });

    return cb && cb(pluses);
  });
};

jQuery(document).ready(function ($) {
  var pathname = window.location.pathname;
  var tokens = pathname.split('/'),
      owner = tokens[1],
      repo = tokens[2];

  if (!window.octoreactions) window.octoreactions = new Octoreactions(owner, repo);

  // Issue detail
  if (pathname.match(/(\w|\/)*issues\/\d/)) {
    var issueId = +tokens[tokens.length - 1];
    octoreactions.renderIssue(issueId);
  }

  // Issue List
  else if (pathname.match(/(\w|\/)*issues\//)) {}
});
//# sourceMappingURL=octoreactions.js.map
