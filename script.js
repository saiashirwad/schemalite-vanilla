let card = document.getElementById("hidden_card");

let cards = [];

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
cards.push(a1);
console.log(cards)

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



document.body.addEventListener("click", function(e) {
  if (this === e.target) {
    console.log("Parent event, boi")
  }
}, true)




let button = document.getElementById("addTable")
button.onclick = _ => {
  let node = document.body.appendChild(copyHidden(card))
  node.querySelector("#title").innerHTML = "table_name"
  node = Editable(Draggable(node))
  cards.push(node)
  console.log(cards)
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