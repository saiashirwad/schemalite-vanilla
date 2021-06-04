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

function addCallback(node, action, callback) {
  return node.addEventListener(action, callback)
}

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

    document.onmouseup = _ => {
      document.onmouseup = null;
      document.onmousemove = null;
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

Draggable(a1)
Editable(a1)

document.body.addEventListener("click", function(e) {
  if (this === e.target) {
    console.log("Parent event, boi")
  }
}, true)

let button = document.getElementById("adddiv")
button.onclick = _ => {
  let node = document.body.appendChild(copyHidden(card))
  node.querySelector("#title").innerHTML = "Hey boi!"
  return Editable(Draggable(node))
}

// /**
//  * 
//  * @param {HTMLElement} e 
//  * @param {string} className 
//  */
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

  function init() {
    contextListener();
    clickListener();
    keyUpListener();
  }


  function positionMenu(e) {
    menuPosition = getPosition(e);
    console.log(menuPosition);
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

