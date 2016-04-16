import $ from 'jquery';
import R from 'ramda';
import { createStore } from 'redux';
import reducers from './reducers.js';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';

import { PJAX_CONTAINER } from './constants.js';


const location = R.identity(window.location.pathname)
const tokenize  = R.pipe(R.split('/'), R.tail); 

const user = R.pipe(tokenize, R.head);
const repository = R.pipe(tokenize, R.nth(1));
const issue = R.pipe(tokenize, R.nth(3), R.replace(/#.*/, ''));

const engine = createEngine('octoreactions')
const store = createStore(reducers);

const bootstrap = R.curry((user, repository, issue, store) => {
  

})

const renderDetail = R.identity
const renderList = R.identity


export {
  user,
  repository,
  issue,
  renderDetail,
  renderList
}

