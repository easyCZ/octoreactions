const REACTIONS_DEFAULT = {
  '+1': true,
  '-1': false,
  heart: false,
  smile: false,
  tada: false,
  thinking_face: false
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
    '+1': document.getElementById('+1').checked || REACTIONS_DEFAULT['+1'],
    '-1': document.getElementById('-1').checked || REACTIONS_DEFAULT['-1'],
    heart: document.getElementById('heart').checked || REACTIONS_DEFAULT.heart,
    smile: document.getElementById('smile').checked || REACTIONS_DEFAULT.smile,
    tada: document.getElementById('tada').checked || REACTIONS_DEFAULT.tada,
    thinking_face: document.getElementById('thinking_face').checked || REACTIONS_DEFAULT.thinking_face,
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