
function initClippy() {
  chrome.tabs.executeScript(null,
    {code:"clippy.show();"}
  );
}

chrome.identity.getProfileUserInfo(
  function(info){
    email = info.email;
  }
)

chrome.tabs.onUpdated.addListener(initClippy);
chrome.tabs.onCreated.addListener(initClippy);
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse){
    sendResponse({ email: email })
  }
)