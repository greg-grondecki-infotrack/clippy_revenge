// Saves options to chrome.storage.sync.
function save_options() {
  var color = document.getElementById('color').value;
  var likesColor = document.getElementById('like').checked;
  var keithy = document.getElementById('keithy').checked;
  var enablePopups = document.getElementById('enablePopups').checked;
  chrome.storage.sync.set({
    favoriteColor: color,
    likesColor: likesColor,
    keithy: keithy,
    enablePopups: enablePopups
  }, function () {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function () {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    favoriteColor: 'red',
    likesColor: true,
    keithy: false,
    enablePopups: false,
  }, function (items) {
    document.getElementById('color').value = items.favoriteColor;
    document.getElementById('like').checked = items.likesColor;
    document.getElementById('keithy').checked = items.keithy;
    document.getElementById('enablePopups').checked = items.enablePopups;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
var save = document.getElementById('save');
if(save){
  save.addEventListener('click', save_options);
}
