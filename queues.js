const backgroundColourUrl = 'https://pulse.infotrack.com.au/infocharting/Chart/BackGroundColor';
const wikiUrl = 'https://infotrackhome.sharepoint.com/development/SitePages/Wiki/Queues.aspx';
const boardUrl = 'http://auawsrpt001l/infocharting';

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
        response = _setImportanceFromQueueColour(response);
          if(callback)
            callback(response)
        });
  };

  _queues.BoardAlertImportance = Object.freeze({"NONE":0, "LOW":1, "MEDIUM":2, "HIGH":3});

  _queues.getQueuesMessage = function(response) {
    let message;
    if(response.Importance === queues.BoardAlertImportance.LOW
          || response.Importance === queues.BoardAlertImportance.MEDIUM
          || response.Importance === queues.BoardAlertImportance.HIGH
      ){
        message = `Oops, you'd better <a href="${boardUrl}" target="_blank">check the board</a>! <br /><br />(OrderUpdateRows: ${response.OrderUpdatesRows})`;
      }
      else if(response.Importance === queues.BoardAlertImportance.NONE){
        message = `The queues board looks ok probably. You can <a href="${boardUrl}" target="_blank">check the board</a> here. <br /><br />Also, don't forget to <a href="${wikiUrl}" target="_blank">update the wiki</a> while on queues.<br /><br />(OrderUpdateRows: ${response.OrderUpdatesRows})`;
      }
      else{
        message = "Unable to fetch queue data. Soz. Would you like to help me with that?";
      }

      return {message: message, status: response.Importance}
  };

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
