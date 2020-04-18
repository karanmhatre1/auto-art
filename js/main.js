
window.onload = function() {
  // Setup directly from canvas id:
  paper.setup('myCanvas');

  var canvas = document.getElementById("myCanvas");

  document.getElementById("btn").addEventListener("click", function() {

    var canvas = document.getElementById("myCanvas");
    
    dataURL = canvas.toDataURL();  
    document.getElementById('btn').href = dataURL;

  });

  document.getElementById("generateBtn").addEventListener("click", function() {
    generateArt();
  });

  document.getElementById("animateBtn").addEventListener("click", function() {

    var controls = document.getElementById("controls");

    var x = document.getElementById("audio");
    
    if(this.getAttribute("data-playing") == "1") {
      stopAnimation();
      this.setAttribute("data-playing", "0");
      event.srcElement.innerHTML = "Animate";
      x.pause();
    }
    else {
      animation();
      this.setAttribute("data-playing", "1");
      event.srcElement.innerHTML = "Stop";
      controls.classList.add("hide");
      document.getElementById("showControlsContainer").classList.remove("hide");
      x.play();
    }

  });

  document.getElementById("showControls").addEventListener("click", function() {
    controls.classList.remove("hide");
    document.getElementById("showControlsContainer").classList.add("hide");
  });

  generateArt();

}