'use strict';

var REACTIONS_DEFAULT = {
  '+1': true,
  '-1': false,
  heart: false,
  smile: false,
  tada: false,
  thinking_face: false
};

var CACHE_DEFAULT = 10;
var DEFAULT_SETTINGS = {
  reactions: REACTIONS_DEFAULT,
  cache: CACHE_DEFAULT
};

var sync = function sync() {
  return chrome.storage.sync.get(DEFAULT_SETTINGS, function (settings) {
    Object.keys(settings.reactions).forEach(function (key) {
      document.getElementById(key).checked = settings.reactions[key];
    });

    document.getElementById('cache').value = settings.cache;
  });
};

var $reset = document.getElementById('reset');
var $save = document.getElementById('save');

document.addEventListener('DOMContentLoaded', sync);

$reset.addEventListener('click', function () {
  chrome.storage.sync.set(DEFAULT_SETTINGS, sync);
});

$save.addEventListener('click', function () {
  var reactions = {
    '+1': document.getElementById('+1').checked || REACTIONS_DEFAULT['+1'],
    '-1': document.getElementById('-1').checked || REACTIONS_DEFAULT['-1'],
    heart: document.getElementById('heart').checked || REACTIONS_DEFAULT.heart,
    smile: document.getElementById('smile').checked || REACTIONS_DEFAULT.smile,
    tada: document.getElementById('tada').checked || REACTIONS_DEFAULT.tada,
    thinking_face: document.getElementById('thinking_face').checked || REACTIONS_DEFAULT.thinking_face
  };
  var cache = document.getElementById('cache').value || CACHE_DEFAULT;

  chrome.storage.sync.set({ reactions: reactions, cache: cache }, function () {
    var status = document.getElementById('status');
    status.textContent = 'Saved';

    setTimeout(function () {
      status.textContent = '';
    }, 1000);

    sync();
  });
});
//# sourceMappingURL=options.js.map
