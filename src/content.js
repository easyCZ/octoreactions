import {
  store,
  octoreactions,
  loadLocalStorage
} from './content/';
import $ from 'jquery';


const PJAX_CONTAINER = '#js-repo-pjax-container, .context-loader-container, [data-pjax-container]'
const pjax = $(PJAX_CONTAINER)[0];
const pathname = () => Promise.resolve(window.location.pathname)

new window.MutationObserver(() => {
  pathname().then(octoreactions)
}).observe(pjax, { childList: true })

loadLocalStorage()
  .then(pathname)
  .then(octoreactions)
  .catch(err => console.error(err));
