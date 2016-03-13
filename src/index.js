jQuery(document).ready(function ($) {

  const GH_PJAX_CONTAINER_SEL = '#js-repo-pjax-container, .context-loader-container, [data-pjax-container]'

  const pathname = window.location.pathname;
  const tokens = pathname.split('/'),
        owner = tokens[1],
        repo = tokens[2];

  if (!window.octoreactions) {
    window.octoreactions = new Octoreactions(owner, repo);
    window.octoreactions.render();
  }


  // Setup observers
  const pageChangeObserver = new window.MutationObserver(() => {
    console.debug('[Octoreactions] Page Change');
    return $(document).trigger(EVENT.LOCATION_CHANGE);
  })

  const pjaxContainer = $(GH_PJAX_CONTAINER_SEL)[0]

  if (pjaxContainer) pageChangeObserver.observe(pjaxContainer, {
    childList: true,
  })

});