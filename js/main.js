
window.onload = function() {
  // Setup directly from canvas id:
  paper.setup('myCanvas');

  var canvas = document.getElementById("myCanvas");
  var parent = document.getElementById("container");
  
  canvas.width = parent.offsetWidth;
  canvas.height = parent.offsetHeight;

  document.getElementById("btn").addEventListener("click", function() {

    var canvas = document.getElementById("myCanvas");
    
    dataURL = canvas.toDataURL();  
    document.getElementById('btn').href = dataURL;

  });

  document.getElementById("generateBtn").addEventListener("click", function() {
    generateArt();
  });

}