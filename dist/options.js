'use strict';

var REACTIONS_DEFAULT = {
  plus: true,
  minus: false,
  heart: false,
  smile: false,
  tada: false,
  thinking: false
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
    plus: document.getElementById('plus').value || REACTIONS_DEFAULT.plus,
    minus: document.getElementById('minus').value || REACTIONS_DEFAULT.minus,
    heart: document.getElementById('heart').value || REACTIONS_DEFAULT.heart,
    smile: document.getElementById('smile').value || REACTIONS_DEFAULT.smile,
    tada: document.getElementById('tada').value || REACTIONS_DEFAULT.tada,
    thinking: document.getElementById('thinking').value || REACTIONS_DEFAULT.thinking
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
