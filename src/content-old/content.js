import $ from 'jquery';
import { compose, map } from 'ramda';
import store from './content/store';


const GH_PJAX_CONTAINER_SEL = '#js-repo-pjax-container, .context-loader-container, [data-pjax-container]'

console.log('runs');
window.octoreactions = {};

const pageChangeObserver = new window.MutationObserver(() => {
  console.log('obs', window.location)
})

pageChangeObserver.observe($(GH_PJAX_CONTAINER_SEL)[0], {
  childList: true
})


// const renderDetail = (owner, repository, issueId) => {

//   $(document).find()

// }

// const REACTIONS_CONTAINER = '.comment-reactions-options'

// const jqElem = map($);
// const reactionsContainers = ($dom) => $dom.find(REACTIONS_CONTAINER)
// const reactionButtons = ($dom) => {
//   console.log('$dom', $dom  )
//   return map($dom.find('button'))
// }


// const reactions = compose(reactionButtons, jqElem, reactionsContainers)


// // console.log(map($)(reactionsContainers)($(document)))
// console.log(reactions($(document)))
//
// jQuery(document).ready(function ($) {
//
//
//
//   if (!window.octoreactions) {
//     window.octoreactions = new Octoreactions();
//     window.octoreactions.updateAndRender();
//   }
//
//   // Setup observers
//   const pageChangeObserver = new window.MutationObserver(() => {
//     window.octoreactions.updateAndRender();
//   })
//
//   const pjaxContainer = $(GH_PJAX_CONTAINER_SEL)[0]
//
//   if (pjaxContainer) pageChangeObserver.observe(pjaxContainer, {
//     childList: true,
//   })
//
//   chrome.storage.onChanged.addListener((changes, areaName) => {
//     if (areaName === 'sync') {
//       chrome.storage.sync.get(['cache', 'reactions'], (vals) => {
//         debugger;
//         window.octoreactions.setSettings(vals);
//         window.octoreactions.render();
//       })
//     }
//
//   });
//
// });
