jQuery(document).ready(function ($) {

  const GH_PJAX_CONTAINER_SEL = '#js-repo-pjax-container, .context-loader-container, [data-pjax-container]'

  if (!window.octoreactions) {
    window.octoreactions = new Octoreactions(null, chrome.storage);
    window.octoreactions.updateState();
    window.octoreactions.render();
  }


  // Setup observers
  const pageChangeObserver = new window.MutationObserver(() => {
    console.debug('[Octoreactions] Page Change');

    window.octoreactions.updateState();
    window.octoreactions.render();

    // return $(document).trigger(EVENT.LOCATION_CHANGE);
  })

  const pjaxContainer = $(GH_PJAX_CONTAINER_SEL)[0]

  if (pjaxContainer) pageChangeObserver.observe(pjaxContainer, {
    childList: true,
  })

});