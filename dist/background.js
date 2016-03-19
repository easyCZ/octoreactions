'use strict';

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

  if (changeInfo.status !== 'loading') {
    return;
  }

  chrome.tabs.insertCSS(tabId, {
    file: 'dist/octoreactions.css',
    runAt: 'document_start'
  });

  chrome.tabs.executeScript(tabId, {
    file: 'lib/jquery-2.2.1.min.js',
    runAt: 'document_start'
  }, function () {

    chrome.tabs.executeScript(tabId, {
      file: 'dist/octoreactions.js',
      runAt: 'document_start'
    });
  });
});
//# sourceMappingURL=background.js.map
