function dragElement(elmnt, suffix) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
  if (document.getElementById(elmnt.id + suffix)) {
    document.getElementById(elmnt.id + suffix).onmousedown = dragMouseDown
  } else {
    elmnt.onmousedown = dragMouseDown
  }

  function dragMouseDown(e) {
    e = e || window.event
    e.preventDefault()
    pos3 = e.clientX
    pos4 = e.clientY
    document.onmouseup = closeDragElement
    document.onmousemove = elementDrag
  }

  function elementDrag(e) {
    e = e || window.event
    e.preventDefault()

    pos1 = pos3 - e.clientX
    pos2 = pos4 - e.clientY
    pos3 = e.clientX
    pos4 = e.clientY

    elmnt.style.top = (elmnt.offsetTop - pos2) + "px"
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px"
  }

  function closeDragElement() {
    document.onmouseup = null
    document.onmousemove = null
  }
}

function addTimer() {
  var starttime = Date.now()
  var timer = document.getElementById('timer')
  var time = document.getElementById('time')
  window.setInterval(function() {
    var s = (Date.now() - starttime)/1000
    var str = ""
    if (s > 86400) {
      str = Math.floor(s/86400) + "d "
      s %= 86400
    }
    if (s > 3600) {
      str += Math.floor(s/3600) + "h "
      s %= 3600
    }
    if (s > 60) {
      str += Math.floor(s/60) + "m "
      s %= 60
    }
    str += s.toFixed(2) + "s"
    time.textContent = str
  }, 10)
}

window.onload = function() {
  var winerr = document.getElementById('window')
  var foolvid = document.getElementById('foolvid')
  var sadwindow = document.getElementById('sadwindow')
  var sadmode = document.getElementById('sadmode')
  var drag = document.getElementById("drag")

  var element = document.createElement("source")
  element.type = "video/mp4"

  dragElement(drag, "-titlebar")

  function showvideo() {
    if (sadmode.style.display !== "none") {
      element.src = "assets/video.mp4"
    }

    foolvid.appendChild(element)
    winerr.style.display = "none"
    sadmode.style.display = "none"
    sadwindow.style.display = "block"
    foolvid.play()
    addTimer()
  }

  function createClone() {
    var min = 1
    var max = 80

    var clone = drag.cloneNode(true)

    clone.id = drag.id
    clone.style.top = Math.floor(Math.random() * (max - min + 1)) + min + "%"
    clone.style.left = Math.floor(Math.random() * (max - min + 1)) + min + "%"

    var doot = new Audio('assets/doot.mp3')
    doot.play()

    winerr.appendChild(clone)
    dragElement(clone, null)
  }

  document.getElementById('sad').onclick = function() {
    element.src = "assets/video_sad.mp4"
    sadmode.style.display = "none"
  }

  document.body.onclick = function (ev) {
    if (ev.target.getAttribute("id") == "window-close") { createClone() }
    if (ev.target.getAttribute("id") == "fooltime") { showvideo() }
    if (ev.target.getAttribute("id") == "fooltime2") { showvideo() }
  }

  // Prevent shit
  // Right-click menu
  document.addEventListener('contextmenu', event => event.preventDefault())

  // Deleting popup
  window.setInterval(function() {
    if (document.getElementById("window") == null) {
      location.reload()
    }

    if (document.getElementsByClassName("window").length == 0) {
      createClone()
      console.log("Nice try.. but you can't delete it that simply")
    }
  }, 1000)
}
