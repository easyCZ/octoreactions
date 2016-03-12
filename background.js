chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

  if (changeInfo.status !== 'loading') return;

  chrome.tabs.executeScript(tabId, {
    file: 'jquery-2.2.1.min.js',
    runAt: 'document_start'
  }, function () {
    chrome.tabs.executeScript(tabId, {
      file: 'Octoreactions.js',
      runAt: 'document_start'
    })
  })

})
