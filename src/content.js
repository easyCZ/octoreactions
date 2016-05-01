import $ from 'jquery';
import R from 'ramda';
import { store, loadLocalStorage } from './content/storage'
import * as constants from './content/constants'


const location = R.identity(window.location.pathname)
const tokenize  = R.pipe(R.split('/'), R.tail);

const user = R.pipe(tokenize, R.head);
const repository = R.pipe(tokenize, R.nth(1));
const issue = R.pipe(tokenize, R.nth(3), R.replace(/#.*/, ''));
const isIssueList = (location) => {
  const tokens = tokenize(location)
  return R.length(tokens) === 3
    && R.compose(R.equals('issues'), R.last)(tokens)
}
const isIssueDetail = (location) => {
  const tokens = tokenize(location)
  return R.length(tokens) === 4
    && R.compose(R.not, isNaN, parseInt, R.last)(tokens)
}

const renderDetail = R.curry((reactions, $dom) => {
  getPluses($dom)
    .then(r => console.log(r))
})
const renderList = R.identity

const PJAX_CONTAINER = '#js-repo-pjax-container, .context-loader-container, [data-pjax-container]'
const dom = () => Promise.resolve($(window.document))
const getPluses = ($dom) => Promise.resolve(
  $dom.find(constants.PLUS_SELECTOR)
    .map((i, e) => e.nextSibling.nodeValue)
    .get()
    .map(R.trim)
    .map(n => parseInt(n))
)



const bootstrap = (dom) => {

  const pjax = $(PJAX_CONTAINER)[0];

  new window.MutationObserver(() => {
    octoreactions(window.location.pathname, store)
  }).observe(pjax, { childList: true })

}

const octoreactions = R.curry((location, store) => {
  if (isIssueDetail(location)) {
    const renderReactions = renderDetail({ thumbs: 3 })

    dom().then(renderReactions)

  }
  else if (isIssueList(location)) {
   console.log(user(location), repository(location));
  }

  // console.log('octo', location, store);
})

const run = () => {
  dom()
    .then(bootstrap)
    .then(loadLocalStorage)
    .then(octoreactions(window.location.pathname))
    .catch(err => console.error(err));

}

run();
