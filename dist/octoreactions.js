'use strict';

var PLUS_SELECTOR = '.reaction-summary-item[value~="+1"]';
var MINUS_SELECTOR = '.reaction-summary-item[value~="-1"]';
var SMILE_SELECTOR = '.reaction-summary-item[value~="smile"]';
var THINKING_SELECTOR = '.reaction-summary-item[value~="thinking_face"]';
var TADA_SELECTOR = '.reaction-summary-item[value~="tada"]';
var HEART_SELECTOR = '.reaction-summary-item[value~="heart"]';

var REACTION_OPTION_SELECTORS = [PLUS_SELECTOR, MINUS_SELECTOR, SMILE_SELECTOR, THINKING_SELECTOR, TADA_SELECTOR, HEART_SELECTOR];

var OCTOREACTIONS_CONTAINER = '.Octoreactions';

var GITHUB_PLUS = '<g-emoji class="emoji mr-1" fallback-src="https://assets-cdn.github.com/images/icons/emoji/unicode/1f44d.png">👍</g-emoji>';

var EVENT = {
  LOCATION_CHANGE: 'octoreactions:location_change'
};
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var getIssueUrl = function getIssueUrl(owner, repo, issueId) {
  return 'https://github.com/' + owner + '/' + repo + '/issues/' + (issueId ? issueId : '');
};

var Async = function () {
  function Async() {
    _classCallCheck(this, Async);
  }

  _createClass(Async, null, [{
    key: 'getIssueDOM',
    value: function getIssueDOM(owner, repo) {
      var issueId = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

      var url = getIssueUrl(owner, repo, issueId);
      return $.get(url);
    }
  }]);

  return Async;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ISSUE_HEADER_CONTAINER = '.gh-header-meta';
var ISSUE_HEADER_ROW = '.flex-table-item-primary';

var View = function () {
  function View() {
    _classCallCheck(this, View);
  }

  _createClass(View, [{
    key: 'getPlusElement',
    value: function getPlusElement(count) {
      return '\n      <span class="' + OCTOREACTIONS_CONTAINER + '">\n        ' + GITHUB_PLUS + '\n        ' + count + '\n      </span>\n    ';
    }
  }, {
    key: 'shouldRender',
    value: function shouldRender() {
      return false;
    }
  }]);

  return View;
}();

var IssueDetail = function (_View) {
  _inherits(IssueDetail, _View);

  function IssueDetail() {
    _classCallCheck(this, IssueDetail);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(IssueDetail).apply(this, arguments));
  }

  _createClass(IssueDetail, [{
    key: 'parse',
    value: function parse(dom) {
      var $html = $(dom),
          containers = $html.find('.comment-reactions-options');

      var pluses = 0;
      containers.each(function (index, container) {
        var tokens = $(container).find(PLUS_SELECTOR).text().trim().split(' ');
        return pluses += +tokens[tokens.length - 1];
      });

      return pluses;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var plusCount = arguments.length <= 0 || arguments[0] === undefined ? 10 : arguments[0];


      Async.getIssueDOM('easyCZ', 'octoreactions', '1').then(function (dom) {
        var pluses = _this2.parse(dom);

        var $issueHeader = $(ISSUE_HEADER_CONTAINER + ' ' + ISSUE_HEADER_ROW);
        var $octoreactions = $(OCTOREACTIONS_CONTAINER);

        // TODO: Handle more gracefully if exists
        $octoreactions.remove();

        $issueHeader.append(_this2.getPlusElement(pluses));
      });
    }
  }, {
    key: 'shouldRender',
    value: function shouldRender() {
      return window.location.pathname.match(/(\w|\/)*issues\/\d/);
    }
  }]);

  return IssueDetail;
}(View);

var IssueList = function (_View2) {
  _inherits(IssueList, _View2);

  function IssueList() {
    _classCallCheck(this, IssueList);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(IssueList).apply(this, arguments));
  }

  return IssueList;
}(View);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Octoreactions = function () {
  function Octoreactions() {
    _classCallCheck(this, Octoreactions);

    console.debug('[Octoreactions] Init');

    this.views = [new IssueDetail(), new IssueList()];

    $(document).on(EVENT.LOCATION_CHANGE, this.render.bind(this));
  }

  _createClass(Octoreactions, [{
    key: 'render',
    value: function render() {
      this.views.filter(function (v) {
        return v.shouldRender();
      }).forEach(function (v) {
        return v.render();
      });
    }
  }]);

  return Octoreactions;
}();

// function Octoreactions(owner, repo) {

//   this.owner = owner;
//   this.repo = repo;

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
// }

// Octoreactions.prototype.getPlus = function () {
//   return '<g-emoji class="emoji mr-1" fallback-src="https://assets-cdn.github.com/images/icons/emoji/unicode/1f44d.png">👍</g-emoji>';
// }

// Octoreactions.prototype.getIssueUrl = function getIssueUrl(owner, repo, issueId) {
//   return [
//     'https://github.com/', owner, '/', repo, '/issues/', issueId ? issueId : ''
//   ].join('');
// }

// Octoreactions.prototype.renderIssue = function (issueId) {
//   console.log('RenderIssue:', issueId);
//   var url = this.getIssueUrl(this.owner, this.repo, issueId);
//   var that = this;

//   this.getReactions(url, function onGetReactions(count) {
//     var $issueHeader = $('.flex-table-item-primary'),
//         $octoreactions = $('.Octoreactions-Count');

//     $octoreactions.remove();

//     $issueHeader.append([
//       '<span class="Octoreactions-Count">',
//         that.getPlus(),
//         count.toString(),
//       '</span>'
//     ].join(''))
//   })
// }

// Octoreactions.prototype.renderIssueList = function (owner, repo, issues) {
//   issues.forEach(function (issue) {
//     var url = this.getIssueUrl(owner, repo, issue);

//     this.getReactions(url, function (count) {
//           $header.append([
//         '<div class="Octoreactions-Count">',
//           '<g-emoji class="emoji mr-1" fallback-src="https://assets-cdn.github.com/images/icons/emoji/unicode/1f44d.png">👍</g-emoji>',
//           '<span>',
//             reactions.length.toString(),
//           '</span>',
//         '</div>'
//       ].join(''))

//     })
//   }.bind(this))
// }

// Octoreactions.prototype.getReactions = function getReactions(url, cb) {
//   return $.get(url, function onSuccess(data, status, jqxhr) {
//     var $html = $(data),
//         containers = $html.find('.comment-reactions-options');

//     var pluses = 0;
//     containers.each(function (index, container) {
//       var tokens = $(container).find(PLUS_SELECTOR).text().trim().split(' ');
//       return pluses += +tokens[tokens.length - 1]
//     })

//     return cb && cb(pluses);
//   })
// }

// jQuery(document).ready(function ($) {
//   var pathname = window.location.pathname;
//   var tokens = pathname.split('/'),
//       owner = tokens[1],
//       repo = tokens[2];

//   if (!window.octoreactions)
//     window.octoreactions = new Octoreactions(owner, repo)

//   // Issue detail
//   if (pathname.match(/(\w|\/)*issues\/\d/)) {
//     var issueId = +tokens[tokens.length - 1];
//     octoreactions.renderIssue(issueId)
//   }

//   // Issue List
//   else if (pathname.match(/(\w|\/)*issues\//)) {

//   }

// })
'use strict';

jQuery(document).ready(function ($) {

  var GH_PJAX_CONTAINER_SEL = '#js-repo-pjax-container, .context-loader-container, [data-pjax-container]';

  var pathname = window.location.pathname;
  var tokens = pathname.split('/'),
      owner = tokens[1],
      repo = tokens[2];

  if (!window.octoreactions) {
    window.octoreactions = new Octoreactions(owner, repo);
    window.octoreactions.render();
  }

  // Setup observers
  var pageChangeObserver = new window.MutationObserver(function () {
    console.debug('[Octoreactions] Page Change');
    return $(document).trigger(EVENT.LOCATION_CHANGE);
  });

  var pjaxContainer = $(GH_PJAX_CONTAINER_SEL)[0];

  if (pjaxContainer) pageChangeObserver.observe(pjaxContainer, {
    childList: true
  });
});
//# sourceMappingURL=octoreactions.js.map
