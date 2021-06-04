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
 * 
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
 * 
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




(function() {
  "use strict";
  var taskItemClassName = 'task';
  var taskItems = document.querySelectorAll(".card");
  var menu = document.querySelector("#context-menu");
  var menuState = 0;
  var active = "context-menu--active"

  function init() {
    
  }

  const contextListener = () => {

  }

  const clickListener = () => {

  }

  const keyUpListener = () => {

  }

  for (var i = 0, len = taskItems.length; i < len; i ++) {
    var taskItem = taskItems[i];
    contextMenuListener(taskItem);
  }

  /**
   * 
   * @param {HTMLElement} node 
   */
  function contextMenuListener(node) {
    node.addEventListener("contextmenu", e => {
      e.preventDefault();
      toggleMenuOn();
    })
  }

  function toggleMenuOn() {
    if (menuState !== 1) {
      menuState = 1
      menu.classList.add(active)
    }
  }

  init();
})();

document.addEventListener("contextmenu", e => {
  console.log("EH")
})