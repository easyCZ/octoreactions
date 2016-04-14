import $ from 'jquery';
import R from 'ramda';


const location = R.identity(window.location.pathname)
const user = R.compose(R.head, R.tail, R.split('/'));

// console.log('running');

const GH_PJAX_CONTAINER_SEL = '#js-repo-pjax-container, .context-loader-container, [data-pjax-container]'

//const pageChangeObserver = new window.MutationObserver(() => {
//	console.log('observer ran');
//})

//const pjaxContainer = $(GH_PJAX_CONTAINER_SEL)[0];

//pageChangeObserver.observe(pjaxContainer, {
//	 childList: true
//})

export {
  user
}
