const backgroundColourUrl = 'http://auawsrpt001l/infocharting/Chart/BackGroundColor';

/*HELPER API*/
var queues = (function() {  
  var _queues = {};

  _queues.getBoardAlertImportance = function() {
    var response = JSON.parse(_getQueueColour(false).responseText);
    response = _setImportanceFromQueueColour(response);
    return response;
  };

  _queues.getBoardAlertImportanceAsync = function(callback) {
    _getQueueColour(true)
      .done(function(response) {
          debugger;
        response = _setImportanceFromQueueColour(response);
          if(callback)
            callback(response)
        });
  };

  _queues.BoardAlertImportance = Object.freeze({"NONE":0, "LOW":1, "MEDIUM":2, "HIGH":3});

  return _queues;
})();

/*PRIVATE METHODS*/
function _getQueueColour(async){
  return $.ajax({
      url: backgroundColourUrl,
      async: async
    });
}

function _setImportanceFromQueueColour(data){
      switch(data.ChartColour) {
        case 'Black':
            data.Importance = queues.BoardAlertImportance.NONE;
            break;
        case 'Goldenrod':
            data.Importance = queues.BoardAlertImportance.LOW;
            break;
        case 'DarkOrange':
            data.Importance = queues.BoardAlertImportance.MEDIUM;
            break;
        case 'Red':
            data.Importance = queues.BoardAlertImportance.HIGH;
            break;
        default:
            break;
    }
    return data;
}
