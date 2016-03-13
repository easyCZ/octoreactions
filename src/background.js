chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

  if (changeInfo.status !== 'complete') {
    return;
  }

  chrome.tabs.insertCSS(tabId, {
    file: 'octoreactions.css',
    runAt: 'document_start'
  });

  chrome.tabs.executeScript(tabId, {
    file: 'jquery-2.2.1.min.js',
    runAt: 'document_start'
  }, () => {
    chrome.tabs.executeScript(tabId, {
      file: 'Octoreactions.js',
      runAt: 'document_start'
    })
  })

})
