
function Octoreactions(test) {
  this.test = test;
  var that = this;
  $('.table-list-issues li').each(function (i, issue) {
    debugger;
    var links = $(issue).find('.issue-title-link');
    var $header = $(issue).find('.issue-comments');

    if (links.length === 0) return;

    that.get(links.attr('href'), function (success, data) {
      var reactions = $(data).find('.reaction-summary-item[value~="+1"]');

      $header.append([
        '<div class="Octoreactions-Count">',
          '<g-emoji class="emoji mr-1" fallback-src="https://assets-cdn.github.com/images/icons/emoji/unicode/1f44d.png">👍</g-emoji>',
          '<span>',
            reactions.length.toString(),
          '</span>',
        '</div>'
      ].join(''))
      // <g-emoji class="emoji mr-1" fallback-src="https://assets-cdn.github.com/images/icons/emoji/unicode/1f44d.png">👍</g-emoji>

      console.log('Reactions:', reactions.length);
    })
  })

  // this.issues = document.querySelectorAll('.issue-title-link');
  // // debugger;

  // var that = this;
  // [].forEach.call(this.issues, function ($issue) {
  //   var url = $issue.href;
  //   // var url = 'https://api.github.com/repos/easyCZ/octoreactions/issues/1/comments';

  //   that.get(url, function (success, data) {
  //     var reactions = $(data).find('.reaction-summary-item[value~="+1"]');


  //     console.log('Reactions:', reactions.length);
  //   })
  // })
  // this.issues.forEach()
  // console.log(this.issues);
}

Octoreactions.prototype.get = function get(url, cb) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  // request.setRequestHeader('Accept', 'application/vnd.github.v3+json')

  request.onload = function onload() {
    if (request.stats >= 200 && request.status < 400) {
      return cb(false, request.responseText);
    }
    return cb(true, request.responseText);
  }

  return request.send();
}

window.octoreactions = new Octoreactions();