function initClippy() {
  chrome.tabs.executeScript(null,
      {code:"clippy.show();"}
    );  
}

function dismissClippyNotification(notificationId){
  //window.focus(); // doesn't seem to do anything
  chrome.notifications.clear(notificationId);
  window.open('http://auawsrpt001l/infocharting');
}

chrome.identity.getProfileUserInfo(
  function(info){
    email = info.email;
  }
)

chrome.tabs.onUpdated.addListener(initClippy);
chrome.tabs.onCreated.addListener(initClippy);
chrome.notifications.onClicked.addListener(dismissClippyNotification);

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse){
    if(request.userChecky){
      sendResponse({ email: email })
    }
    if(request.notify){
      chrome.notifications.create("clippy_notificationy", request.notify);
    }
  }
)