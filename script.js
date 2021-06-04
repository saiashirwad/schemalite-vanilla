let card = document.getElementById("hidden_card");

/**
* Clone and unhide hidden element
* @param {HTMLElement} node 
* @returns  {HTMLElement}
*/
function copyHidden(node) {
  let new_node = node.cloneNode(true);
  new_node.removeAttribute("hidden");
  new_node.id = "";
  return new_node;
}

let a1 = document.body.appendChild(copyHidden(card));
Draggable(a1)

/**
* Make yo HTMLElements *editable*
* @param {HTMLElement} node 
* @returns {HTMLElement}
*/
function Editable(node) {
  var editable = false

  node.ondblclick = _ => {
    node.contentEditable = !editable;
    console.log("EDIT MEEE BOYYYYY")
  }
  return node
}

/**
* Make yo HTMLElements *draggable*
* @param {HTMLElement} node 
* @returns {HTMLElement}
*/
function Draggable(node) {
  var x1, y1, x2, y2 = 0;
  node.onmousedown = e => {
    e.preventDefault();
    x2 = e.clientX;
    y2 = e.clientY;

    node.style.zIndex = 3;
    
    document.onmouseup = _ => {
      document.onmouseup = null;
      document.onmousemove = null;
      node.style.zIndex = 9;
    }
    
    document.onmousemove = e => {
      e.preventDefault();
      x1 = x2 - e.clientX;
      y1 = y2 - e.clientY;
      x2 = e.clientX;
      y2 = e.clientY;
      node.style.top = (node.offsetTop - y1) + "px"
      node.style.left = (node.offsetLeft - x1) + "px"
    }
  }
  return node;
}


document.body.addEventListener("click", function(e) {
  if (this === e.target) {
    console.log("Parent event, boi")
  }
}, true)

let button = document.getElementById("addTable")
button.onclick = _ => {
  let node = document.body.appendChild(copyHidden(card))
  node.querySelector("#title").innerHTML = "table_name"
  return Editable(Draggable(node))
}

function clickInsideElement(e, className) {
  var node = e.srcElement || e.target
  
  if (node.classList.contains(className)) {
    return node;
  } else {
    while (node = node.parentNode) {
      if (node.classList && node.classList.contains(className)) {
        return node;
      }
    }
  }
  
  return false;
}

function getPosition(e) {
  var x, y  = 0;
  
  if (!e) var e = window.event;
  
  if (e.pageX || e.pageY) {
    x = e.pageX
    y = e.pageY
  } else if (e.clientX || e.clientY) {
    x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  
  return {
    x: x,
    y: y
  }
}


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
    
    // menuPosition = getPosition(e);
    // menuX = menuPosition.x + "px";
    // menuY = menuPosition.y + "px";
    
    // menu.style.left = menuX;
    // menu.style.top = menuY;
    
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

