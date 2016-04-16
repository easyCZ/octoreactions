//import {
  user,
  repository,
  issue,
  //isIssueList,
  //isIssueDetail,
  //renderList,
  //renderDetail,
  //store
//} from './content/';
import $ from 'jquery';
import R from 'ramda';


const PJAX_CONTAINER = '#js-repo-pjax-container, .context-loader-container, [data-pjax-container]'


const render = (pathname, store) => {

  console.log('render', pathname, store);
  
  if (isIssueList(pathname)) return renderList(
    ...R.ap([user, repository], [pathname]), 
    store, 
    document.body 
  )

  if (isIssueDetail(pathname)) return renderDetail(
    ...R.ap([user, repository, issue], [pathname]),
    store,
    document.body
  )

}
new window.MutationObserver(() => {
  render(window.location.pathname, {})
}).observe($(PJAX_CONTAINER)[0], { childList: true })

render(window.location.pathname, {})
