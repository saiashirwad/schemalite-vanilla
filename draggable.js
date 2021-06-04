
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