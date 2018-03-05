const backgroundColourUrl = 'https://pulse.infotrack.com.au/infocharting/Chart/BackGroundColor';
const wikiUrl = 'https://infotrackhome.sharepoint.com/development/SitePages/Wiki/Queues.aspx';

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
        message = `Oops, you better <a href="http://auawsrpt001l/infocharting" target="_blank">check the board</a>! <br /><br />(OrderUpdateRows: ${response.OrderUpdatesRows})`;
      }
      else if(response.Importance === queues.BoardAlertImportance.NONE){
        message = `The queues board looks ok probably. You can <a href="http://auawsrpt001l/infocharting" target="_blank">check the board</a> here. <br /><br />(OrderUpdateRows: ${response.OrderUpdatesRows})`;
      }
      else{
        message = "Unable to fetch queue data. Soz. Would you like to help me with that?";
      }
      return message;
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
