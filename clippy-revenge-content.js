// yay for globals! :)
var popupWindow = null;
var clippyElement = null;
var clippyBalloonElement = null;

var pollyStarty = function (agent) {
  var pollingInterval = 10000;
  window.setInterval(function () {

    queues.getBoardAlertImportanceAsync(function(response){
      poppyUppy(agent, queues.getQueuesMessage(response)); 
    });
    
  }, pollingInterval);
}

var poppyUppy = function(agent, speaky) {
  if (popupWindow == null || popupWindow.closed) {
    popupWindow = window.open("", "", "width=200,height=200");
    popupWindow.document.body.appendChild(clippyElement);
    popupWindow.document.body.appendChild(clippyBalloonElement);
    popupWindow.agent = agent;
    popupWindow.agent.show();
  }
  popupWindow.agent.speak(speaky);
}

clippy.load('Clippy', function (agent) {
  // do anything with the loaded agent
  clippyElement = document.getElementById("clippy-2b3aef30-125c-11e2-892e-0800200c9a66");
  clippyBalloonElement = document.getElementsByClassName("clippy-balloon")[0];

  chrome.extension.sendMessage({}, function (response) {
    var username = response.email;
    var keithy = username.indexOf("keith") !== -1;

    if (keithy) {
      keithMode();
    } else {
      chrome.storage.sync.get('keithy', function (response) {
        if(response.keithy) {
          keithMode();
        } else {
          pollyStarty(agent);
        }
      });
    }
  });

  var callsf = function (yescall) {
    return function () {
      $('.clippyyes').click(function (ev) {
        ev.preventDefault();
        yescall();
        agent.stopCurrent();
        agent.stop();
        agent.speak("Done.");
        agent.play('GetWizardy');
      });

      $('.clippyno').click(function (ev) {
        ev.preventDefault();
        agent.stopCurrent();
        agent.stop();
        agent.speak("I thought not.");
        agent.play('EmptyTrash');
      });
    }
  }

  $('input').keypress(function () {
    agent.stop();
    agent.play('Writing');
  });

  $('textarea').keypress(function () {
    agent.stop();
    agent.play('Writing');
  });


  var urlchangy = function () {
    var yescall = function () { window.location.href = 'http://heeeeeeeey.com/'; }
    agent.speak("I can't help but notice you are on some stupid web page. Want to let me just take you to a cool page?<br /><br /><a href=\"#\" class=\"clippyyes\">YES</a>    <a href=\"#\" class=\"clippyno\">NO</a>", true, callsf(yescall));
  };

  var insulty = function () {
    agent.play('GetAttention');
    agent.speak("You are bad at web browsing, and you should feel bad.");
  };

  var formfilly = function () {
    if (($('input').length == 0) && ($('textarea').length == 0)) { return; }

    var yescall = function () {
      $('input').val('Clippy input');
      $('textarea').val('You can fill this part out with alot of text! Bet you didnt know that!');
    };
    agent.play('Wave');
    agent.speak("Did you know there are some forms to fill out on this page? Want me to fill them out for you?<br /><br /><a href=\"#\" class=\"clippyyes\">YES</a>    <a href=\"#\" class=\"clippyno\">NO</a>", true, callsf(yescall));
  };

  var scrolly = function () {
    var yescall = function () {
      var toScroll = $('body').scrollTop() + 500;
      $('body').scrollTop(toScroll);
    }
    agent.speak("You seem to be taking your time. Want me to scroll down for you?<br /><br /><a href=\"#\" class=\"clippyyes\">YES</a>    <a href=\"#\" class=\"clippyno\">NO</a>", true, callsf(yescall));
  };

  var techy = function () {
    agent.play('GetTechy');
    agent.speak("Did you know, the term \"surfing the web\" came about when a popular surfer ran into a spider web while on his laptop?");
  };

  var clicky = function () {
    if ($('a').length == 0) { return; }
    var yescall = function () {
      $('a')[Math.floor(Math.random() * $('a').length)].click()
    }
    agent.speak("I see some links... want me to pick one and click on it for you?<br /><br /><a href=\"#\" class=\"clippyyes\">YES</a>    <a href=\"#\" class=\"clippyno\">NO</a>", true, callsf(yescall));
  };

  var facty1 = function () {
    agent.speak("Web fact: Internet Explorer is the worst. No one likes it. No one likes developing for it.");
  };

  var pleasy = function () {
    agent.play('Pleased');
    agent.speak("Hmmm.... yes indeed.");
  };

  var linky = function () {
    if ($('a').length == 0) { return; }
    var yescall = function () {
      $('a').css({ color: "red", background: "blue" });
    }
    agent.speak("Hey did you know there are links on this page? Want me to highlight them for you?<br /><br /><a href=\"#\" class=\"clippyyes\">YES</a>    <a href=\"#\" class=\"clippyno\">NO</a>", true, callsf(yescall));
  };

  var facty2 = function () {
    agent.speak("Web fact: the internet was first created by Keith von Infotrackhausen. True story.");
  };

  var caty = function () {
    if ($('img').length == 0) { return; }
    var yescall = function () {
      $('img').attr('src', 'http://cdn77.sadanduseless.com/wp-content/uploads/2014/03/derp3.jpg')
    }
    agent.speak("This page needs more cats, should I put more cats on the page?<br /><br /><a href=\"#\" class=\"clippyyes\">YES</a>    <a href=\"#\" class=\"clippyno\">NO</a>", true, callsf(yescall));
  };

  var colourChangy = function () {
    var yescall = function () {
      $('body').css({ color: "orange", background: "grey" })
      $('div').css({ color: "yellow", background: "green" })
      $('a').css({ color: "blue", background: "white" })
    }
    agent.speak("I have a better color scheme, want me to switch to it?<br /><br /><a href=\"#\" class=\"clippyyes\">YES</a>    <a href=\"#\" class=\"clippyyes\">NO</a>", true, callsf(yescall));
  };

  var animate = function () {
    agent.animate();
  }

  $('#clippy-2b3aef30-125c-11e2-892e-0800200c9a66').click(function () {
    agent.stopCurrent();
    agent.stop();
    var fun = arr[Math.floor(Math.random() * arr.length)];
    fun();
  });

  // use this order for demo
  var arr = [
    animate,
    insulty,
    caty,
    // animate,
    // formfilly,
    techy,
    facty1,
    facty2,
    linky,
    // animate,
    colourChangy,
    clicky,
    urlchangy
  ]

  var count = 0;
  var initial = true;
  
  var keithMode = function () {
    window.setInterval(function () {
      if (initial) {
        agent.speak("Keithy mode enabled, muhahahahaha.");
        initial = false;
      } else {
        var fun = arr[count];
        count++;
        if (count == arr.length) {
          count = 0;
        }
        if (clippy.isEmpty()) {
          fun();
        }
      }
    }, 8000);
  }
});
