chrome.runtime.onMessage.addListener(function(req, sender, sendResponse) {
  if (req.method == "getLocalStorage"){
    sendResponse({ data: localStorage[req.key] });
  } else{
    sendResponse({ }); // snub them.
  }
});
