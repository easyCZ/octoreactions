jQuery(document).ready(function ($) {

  const GH_PJAX_CONTAINER_SEL = '#js-repo-pjax-container, .context-loader-container, [data-pjax-container]'

  const parsePath = (pathname) => {
    const tokens = pathname.split('/'),
        owner = tokens[1],
        repo = tokens[2];
    return [owner, repo];
  }

  const setRepoState = () => {
    const [owner, repo] = parsePath(window.location.pathname);
    STATE.owner = owner;
    STATE.repo = repo;
  }

  let [owner, repo] = parsePath(window.location.pathname);

  if (!window.octoreactions) {
    window.octoreactions = new Octoreactions();
    setRepoState();
    window.octoreactions.render();
  }


  // Setup observers
  const pageChangeObserver = new window.MutationObserver(() => {
    console.debug('[Octoreactions] Page Change');
    setRepoState();

    return $(document).trigger(EVENT.LOCATION_CHANGE);
  })

  const pjaxContainer = $(GH_PJAX_CONTAINER_SEL)[0]

  if (pjaxContainer) pageChangeObserver.observe(pjaxContainer, {
    childList: true,
  })

});