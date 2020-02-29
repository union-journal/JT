var avopos = 0;
var beerpos = 0;
var bootpos = 0;
var greenepos = 0;
var dragonfruitpos = 0;
var duckspos = 0;
var kangapos = 0;
var fruitpos = 0;
var londonpos = 0;
var mustardpos = 0;
var pastapos = 0;
var popsiclepos = 0;
var rubberduckypos = 0;
var sunpos = 0;
var snakepos = 0;

var sound;
var play = false;

// Make the DIV element draggable:
window.onload = function() {

    dragElement(document.getElementById("avo"));
    dragElement(document.getElementById("beer"));
    dragElement(document.getElementById("boot"));
    dragElement(document.getElementById("greene"));
    dragElement(document.getElementById("dragonfruit"));
    dragElement(document.getElementById("ducks"));
    dragElement(document.getElementById("kanga"));
    dragElement(document.getElementById("fruit"));
    dragElement(document.getElementById("london"));
    dragElement(document.getElementById("mustard"));
    dragElement(document.getElementById("pasta"));
    dragElement(document.getElementById("popsicle"));
    dragElement(document.getElementById("rubberducky"));
    dragElement(document.getElementById("sun"));
    dragElement(document.getElementById("snake"));
    run = document.getElementById("run");
    play = document.getElementById("play");
    pause = document.getElementById("pause");
    pop = document.getElementById("popup");

    pop.addEventListener(
      "click",
      function(ev) {
        hidePopup();
      }
    );

    run.addEventListener(
      "click",
      function(ev) {
        runScript();
      }
    );

    play.addEventListener(
      "click",
      function(ev) {
        document.getElementById("audioelement").play();
      }
    );

    pause.addEventListener(
      "click",
      function(ev) {
        document.getElementById("audioelement").pause();
      }
    )
};



function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    // console.log(elmnt.id)
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

    window[elmnt.id + "pos"] = Math.round(parseInt((elmnt.offsetTop + elmnt.offsetLeft), 10)/50);
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function runScript() {
    // scales between 40 and -10
    var mag_scales = [avopos, beerpos, bootpos, dragonfruitpos, greenepos, duckspos, kangapos, fruitpos, londonpos, mustardpos, pastapos, popsiclepos, rubberduckypos, sunpos, snakepos];
    console.log(mag_scales)
    paramz = mag_scales.map(x=>"scales%5B%5D="+x).join("&")
    document.getElementById("source").src="/infer?"+paramz
    document.getElementById("audioelement").load()

  }

function hidePopup() {
  var x = document.getElementById("popup");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
