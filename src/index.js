jQuery(document).ready(function ($) {

  const GH_PJAX_CONTAINER_SEL = '#js-repo-pjax-container, .context-loader-container, [data-pjax-container]'

  if (!window.octoreactions) {
    window.octoreactions = new Octoreactions();
    window.octoreactions.updateAndRender();
  }

  // Setup observers
  const pageChangeObserver = new window.MutationObserver(() => {
    window.octoreactions.updateAndRender();
  })

  const pjaxContainer = $(GH_PJAX_CONTAINER_SEL)[0]

  if (pjaxContainer) pageChangeObserver.observe(pjaxContainer, {
    childList: true,
  })

});