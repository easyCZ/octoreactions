'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Parser = function () {
  function Parser() {
    _classCallCheck(this, Parser);
  }

  _createClass(Parser, null, [{
    key: 'parseIssueDetail',
    value: function parseIssueDetail($dom) {
      var containers = $dom.find('.comment-reactions-options');

      var plus = 0;
      containers.each(function (index, container) {
        var tokens = $(container).find(PLUS_SELECTOR).text().trim().split(' ');
        return plus += +tokens[tokens.length - 1];
      });

      return { plus: plus };
    }
  }, {
    key: 'getIssues',
    value: function getIssues($dom) {
      var issues = [];
      $('.table-list-issues li').each(function (i, issue) {
        var $issue = $(issue);
        var tokens = $issue.find('a').last().attr('href').split('/');
        issues.push({
          id: +tokens[tokens.length - 1],
          $issue: $issue
        });
      });

      return issues;
    }
  }]);

  return Parser;
}();
'use strict';

var PLUS_SELECTOR = '.reaction-summary-item[value~="+1"]';
var MINUS_SELECTOR = '.reaction-summary-item[value~="-1"]';
var SMILE_SELECTOR = '.reaction-summary-item[value~="smile"]';
var THINKING_SELECTOR = '.reaction-summary-item[value~="thinking_face"]';
var TADA_SELECTOR = '.reaction-summary-item[value~="tada"]';
var HEART_SELECTOR = '.reaction-summary-item[value~="heart"]';

var REACTION_OPTION_SELECTORS = [PLUS_SELECTOR, MINUS_SELECTOR, SMILE_SELECTOR, THINKING_SELECTOR, TADA_SELECTOR, HEART_SELECTOR];

var STORAGE = 'octoreactions';
var OCTOREACTIONS_CLASS = 'Octoreactions';
var OCTOREACTIONS_COUNT_CLASS = 'Octoreactions-Count';
var OCTOREACTIONS_CONTAINER = '.Octoreactions';

var GITHUB_PLUS = '<g-emoji class="emoji mr-1" fallback-src="https://assets-cdn.github.com/images/icons/emoji/unicode/1f44d.png">👍</g-emoji>';

var EVENT = {
  LOCATION_CHANGE: 'octoreactions:location_change'
};
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Async = function () {
  function Async() {
    _classCallCheck(this, Async);
  }

  _createClass(Async, null, [{
    key: "getIssueDOM",
    value: function getIssueDOM(owner, repo, issueId) {
      var url = "https://github.com/" + owner + "/" + repo + "/issues/" + issueId;
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

  _createClass(View, null, [{
    key: 'getPlusElement',
    value: function getPlusElement(count) {
      return '\n      <span class="' + OCTOREACTIONS_CLASS + '">\n        ' + GITHUB_PLUS + '\n        <span class="' + OCTOREACTIONS_COUNT_CLASS + '">' + count + '</span>\n      </span>\n    ';
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

      var tokens = window.location.pathname.split('/');
      var issueId = tokens[tokens.length - 1];
      Async.getIssueDOM(STATE.owner, STATE.repo, issueId).then(function (dom) {
        var pluses = _this2.parse(dom);

        var storage = {};
        var namespace = STATE.owner + '/' + STATE.repo;
        storage[namespace] = {};
        storage[namespace][issueId] = pluses;
        chrome.storage.local.set(storage, function () {
          // debugger;
        });

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
  }], [{
    key: 'render',
    value: function render(_ref) {
      var plus = _ref.plus;


      var $issueHeader = $(ISSUE_HEADER_CONTAINER + ' ' + ISSUE_HEADER_ROW);
      var $octoreactions = $(OCTOREACTIONS_CONTAINER);

      // TODO: Handle more gracefully if exists
      $octoreactions.remove();

      $issueHeader.append(View.getPlusElement(plus));
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

  _createClass(IssueList, [{
    key: 'getIssues',
    value: function getIssues() {
      return $('.table-list-issues li');
    }
  }, {
    key: 'getIssueId',
    value: function getIssueId($issue) {
      var tokens = $issue.find('a').last().attr('href').split('/');
      return +tokens[tokens.length - 1];
    }
  }, {
    key: 'renderCountToIssue',
    value: function renderCountToIssue($issue, count) {
      var $commentsContainer = $issue.find('.issue-comments');
      var octoreactions = $commentsContainer.find(OCTOREACTIONS_CONTAINER);

      octoreactions.remove();

      $commentsContainer.append(this.getPlusElement(count));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var issueDetail = new IssueDetail();
      var $issues = this.getIssues();

      $issues.each(function (i, issue) {
        var $issue = $(issue);
        var issueId = _this4.getIssueId($issue);

        Async.getIssueDOM(STATE.owner, STATE.repo, issueId).then(function (dom) {

          var pluses = issueDetail.parse(dom);

          if (pluses > 0) _this4.renderCountToIssue($issue, pluses);
        });
      });

      console.log('rendering');
    }
  }, {
    key: 'shouldRender',
    value: function shouldRender() {
      return window.location.pathname.endsWith('issues');
    }
  }], [{
    key: 'render',
    value: function render(_ref2, $issue) {
      var plus = _ref2.plus;

      var $commentsContainer = $issue.find('.issue-comments');
      var octoreactions = $commentsContainer.find(OCTOREACTIONS_CONTAINER);

      octoreactions.remove();

      $commentsContainer.append(View.getPlusElement(plus));
    }
  }]);

  return IssueList;
}(View);
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var initialState = {
  owner: null,
  repository: null,
  issueId: null
};

var Octoreactions = function () {
  function Octoreactions() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var chromeStorage = arguments[1];

    _classCallCheck(this, Octoreactions);

    this.state = state;
    this.storage = chromeStorage.local;

    this.updateState();
    this.render();
  }

  _createClass(Octoreactions, [{
    key: 'updateState',
    value: function updateState() {
      var pathname = arguments.length <= 0 || arguments[0] === undefined ? window.location.pathname : arguments[0];

      var _pathname$split = pathname.split('/');

      var _pathname$split2 = _slicedToArray(_pathname$split, 5);

      var _ = _pathname$split2[0];
      var owner = _pathname$split2[1];
      var repo = _pathname$split2[2];
      var issues = _pathname$split2[3];
      var issueId = _pathname$split2[4];

      this.state = Object.assign({}, this.state, { owner: owner, repo: repo, issueId: issueId });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var state = this.state;
      var isIssueList = !state.issueId;

      if (isIssueList) {
        (function () {

          var issues = Parser.getIssues($(document));
          var _state = _this.state;
          var owner = _state.owner;
          var repo = _state.repo;


          issues.forEach(function (_ref) {
            var id = _ref.id;
            var $issue = _ref.$issue;

            _this.getReactionsFromStore(owner, repo, id).then(function (r) {
              return r;
            }, function () {
              return Async.getIssueDOM(owner, repo, id).then(function (dom) {
                var reactions = Parser.parseIssueDetail($(dom));
                _this.setReactionsToStore(owner, repo, id, reactions);
                return jQuery.Deferred().resolve(reactions);
              });
            }).then(function (reactions) {
              return IssueList.render(reactions, $issue);
            });
          });
        })();
      } else {
        (function () {
          var _state2 = _this.state;
          var owner = _state2.owner;
          var repo = _state2.repo;
          var issueId = _state2.issueId;

          _this.getReactionsFromStore(owner, repo, issueId).then(function (r) {
            return r;
          }, function () {
            var reactions = Parser.parseIssueDetail($(document));
            _this.setReactionsToStore(owner, repo, issueId, reactions);
            return jQuery.Deferred().resolve(reactions);
          }).then(function (reactions) {
            return IssueDetail.render(reactions);
          });
        })();
      }
    }
  }, {
    key: 'getReactionsFromStore',
    value: function getReactionsFromStore(owner, repo, issueId) {
      var namespace = STORAGE + ':' + owner + ':' + repo;

      var deferred = jQuery.Deferred();

      debugger;
      try {
        var item = JSON.parse(localStorage.getItem(namespace));
        if (issueId in item[namespace]) return deferred.resolve(item[namespace][issueId]);
        return deferred.reject();
      } catch (e) {
        return deferred.reject();
      }

      return deferred;
    }
  }, {
    key: 'setReactionsToStore',
    value: function setReactionsToStore(owner, repo, issueId, reactions) {
      var namespace = STORAGE + ':' + owner + ':' + repo;

      try {
        var stored = JSON.parse(localStorage.getItem(namespace));
        if (!stored) {
          stored = {};
          stored[namespace] = {};
        }
        stored[namespace][issueId] = reactions;
        localStorage.setItem(namespace, JSON.stringify(stored));
      } catch (e) {}
    }
  }]);

  return Octoreactions;
}();
'use strict';

jQuery(document).ready(function ($) {

  var GH_PJAX_CONTAINER_SEL = '#js-repo-pjax-container, .context-loader-container, [data-pjax-container]';

  if (!window.octoreactions) {
    window.octoreactions = new Octoreactions(null, chrome.storage);
    window.octoreactions.updateState();
    window.octoreactions.render();
  }

  // Setup observers
  var pageChangeObserver = new window.MutationObserver(function () {
    console.debug('[Octoreactions] Page Change');

    window.octoreactions.updateState();
    window.octoreactions.render();

    // return $(document).trigger(EVENT.LOCATION_CHANGE);
  });

  var pjaxContainer = $(GH_PJAX_CONTAINER_SEL)[0];

  if (pjaxContainer) pageChangeObserver.observe(pjaxContainer, {
    childList: true
  });
});
//# sourceMappingURL=octoreactions.js.map