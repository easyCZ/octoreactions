const REACTIONS_DEFAULT = {
  plus: true,
  minus: false,
  heart: false,
  smile: false,
  tada: false,
  thinking: false
}

const CACHE_DEFAULT = 10
const DEFAULT_SETTINGS = {
  reactions: REACTIONS_DEFAULT,
  cache: CACHE_DEFAULT
}

const sync = () => chrome.storage.sync.get(DEFAULT_SETTINGS, (settings) => {
  Object.keys(settings.reactions).forEach(key => {
    document.getElementById(key).checked = settings.reactions[key];
  });

  document.getElementById('cache').value = settings.cache;
})

const $reset = document.getElementById('reset')
const $save = document.getElementById('save')



document.addEventListener('DOMContentLoaded', sync);


$reset.addEventListener('click', () => {
  chrome.storage.sync.set(DEFAULT_SETTINGS, sync)
})

$save.addEventListener('click', () => {
  const reactions = {
    plus: document.getElementById('plus').checked || REACTIONS_DEFAULT.plus,
    minus: document.getElementById('minus').checked || REACTIONS_DEFAULT.minus,
    heart: document.getElementById('heart').checked || REACTIONS_DEFAULT.heart,
    smile: document.getElementById('smile').checked || REACTIONS_DEFAULT.smile,
    tada: document.getElementById('tada').checked || REACTIONS_DEFAULT.tada,
    thinking: document.getElementById('thinking').checked || REACTIONS_DEFAULT.thinking,
  }
  const cache = document.getElementById('cache').value || CACHE_DEFAULT;

  chrome.storage.sync.set({reactions, cache}, () => {
    const status = document.getElementById('status');
    status.textContent = 'Saved'

    setTimeout(() => {
      status.textContent = '';
    }, 1000)

    sync();


  })
})