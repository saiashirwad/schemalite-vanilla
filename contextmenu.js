
(function() {
  "use strict";
  var taskItemClassName = 'task';
  var taskItems = document.querySelectorAll(".card");
  var menu = document.querySelector("#context-menu");
  var menuState = 0;
  var activeClassName = "context-menu--active"
  
  var menuPosition;
  var menuX;
  var menuY;
  
  var menuWidth;
  var menuHeight;
  
  var windowWidth;
  var windowHeight;
  
  
  var clickCoords;
  var clickX;
  var clickY;
  
  function init() {
    contextListener();
    clickListener();
    keyUpListener();
  }
  
  
  function positionMenu(e) {
    clickCoords = getPosition(e);
    clickX = clickCoords.x
    clickY = clickCoords.y
    
    menuWidth = menu.offsetWidth + 4;
    menuHeight = menu.offsetHeight + 4;
    
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    if ( (windowWidth - clickX) < menuWidth ) {
      menu.style.left = windowWidth - menuWidth + "px";
    } else {
      menu.style.left = clickX + "px";
    }
    
    if ( (windowHeight - clickY) < menuHeight ) {
      menu.style.top = windowHeight - menuHeight + "px";
    } else {
      menu.style.top = clickY + "px";
    }
    
  }
  
  const contextListener = () => {
    document.addEventListener("contextmenu", function(e) {
      // TODO: refactor
      if (clickInsideElement(e, "card")) {
        e.preventDefault();
        toggleMenuOn();
        positionMenu(e);
      } else {
        toggleMenuOff();
      }
    })
  }
  
  const clickListener = () => {
    document.addEventListener("click", (e) => {
      var button = e.which || e.button
      if (button === 1) {
        toggleMenuOff();
      }
    })
  }
  
  const keyUpListener = () => {
    window.onkeyup = (e) => {
      if (e.keyCode === 27) {
        toggleMenuOff();
      }
    }
  }
  
  function toggleMenuOn() {
    if (menuState !== 1) {
      menuState = 1
      menu.classList.add(activeClassName)
    }
  }
  
  function toggleMenuOff() {
    if (menuState !== 0) {
      menuState = 0;
      menu.classList.remove(activeClassName);
    }
  }
  
  init();
})();