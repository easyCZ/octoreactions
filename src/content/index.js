import $ from 'jquery';
import R from 'ramda';

import { PJAX_CONTAINER } from './constants.js';


const location = R.identity(window.location.pathname)
const tokenize  = R.pipe(R.split('/'), R.tail); 

const user = R.pipe(tokenize, R.head);
const repository = R.pipe(tokenize, R.nth(1));
const issue = R.pipe(tokenize, R.nth(3), R.replace(/#.*/, ''));

const mutationObserver = () => new window.MutationObserver

//const pageChangeObserver = new window.MutationObserver(() => {
//	console.log('observer ran');
//})

//const pjaxContainer = $(GH_PJAX_CONTAINER_SEL)[0];

//pageChangeObserver.observe(pjaxContainer, {
//	 childList: true
//})

const bootstrap = R.curry((user, repository, issue, store) => {
  

})


export {
  user,
  repository,
  issue,
  bootstrap
}
