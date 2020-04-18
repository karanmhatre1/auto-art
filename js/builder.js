paper.install(window);

function getPosition() {
  var canvas = document.getElementById("myCanvas");

  var xBound = window.innerWidth;
  var yBound = window.innerHeight;

  x = Math.floor(Math.random() * (xBound-100));
  y = Math.floor(Math.random() * (yBound));

  point = new Point(x, y);

  return point;
}

function getRandomNumber(min=0, max) {
  return Math.floor(Math.random() * (max-min)) + min;
}

function getColor() {
  var colorList = ["#8C807E", "#94BBC1", "#394B5B", "#EDA659", "#F0B570", '#DDA99D', '#FA6802', '#A49881'];
  return colorList[Math.floor(Math.random() * colorList.length)];
}

function getSize() {
  min = 100
  max = window.innerWidth/2
  return Math.floor(Math.random() * max)+min;
}

function getOpacity() {
  return (Math.random() * 0.5)+0.5;
}

function fillBackground(colour, canvas) {

  var rectangle = new Rectangle(new Point(0, 0), new Size(canvas.width, canvas.height));
  var radius = new Size(0, 0);
  
  var path = new Path.Rectangle(rectangle, radius);  

  path.fillColor = colour;
  path.strokeColor = colour;

  path.sendToBack()
  // path.selected = true;
}

function makeSemiCircle() {

  firstPoint = getPosition();

  var myPath = new Path();
  myPath.fillColor = getColor();
  myPath.opacity = getOpacity();

  size = 400;

  secondPoint = new Point(firstPoint.x+size, firstPoint.y);

  myPath.add(firstPoint, secondPoint);

  myPath.insert(1, new Point(firstPoint.x + (size/6) , firstPoint.y-300));
  myPath.insert(2, new Point(firstPoint.x + (size/2), firstPoint.y-350));
  myPath.insert(3, new Point(firstPoint.x + (size - (size/6)), firstPoint.y-300));
  myPath.closed = true;

  myPath.smooth({type: 'catmull-rom', factor: 0.2, from: -1, to: 1 });
  myPath.smooth({ type: 'catmull-rom', factor: 0.2, from: 0, to: 4 });

  angles = [90,180,-90,-180];
  myPath.rotate(angles[Math.floor(Math.random()*angles.length)]);
}

function makeCircleScribble() {
  var center = getPosition();
  var sides = 4;

  var radius = getSize();

  var polygon = new Path.RegularPolygon(center, sides, radius);
  polygon.strokeColor = getColor();
  polygon.strokeWidth = 2;
  polygon.opacity = getOpacity();

  polygon.smooth({ type: 'continuous'});

  polygon.smooth({type: 'catmull-rom',factor: 0.1,from: 1, to: 3 });

  polygon.smooth({type: 'catmull-rom', factor: 0.1, from: 0, to: 1 });

  angles = [90,180,-90,-180];
  polygon.rotate(angles[Math.floor(Math.random()*angles.length)]);
}

function makeCircle() {
  var center = getPosition();
  var sides = 4;

  var radius = 200;

  var polygon = new Path.RegularPolygon(center, sides, radius);
  polygon.fillColor = getColor();
  polygon.opacity = getOpacity();

  polygon.smooth({ type: 'continuous' });
  polygon.smooth({ type: 'catmull-rom', factor: .5, from: 1, to: 3 });
  polygon.smooth({ type: 'catmull-rom', factor: .5, from: 0, to: 1 });

  angles = [90,180,-90,-180];
  polygon.rotate(angles[Math.floor(Math.random()*angles.length)]);
}

function makeLinesPattern() {

  firstPoint = getPosition();

  var myPath = [];
  sizeWidth = window.innerWidth/2;
  var size = getSize();

  noOfLines = (Math.random()*10)+1;

  color = getColor();

  var linesPatternGroup = new Group();


  for(var i=0;i<noOfLines;i++) {
    myPath[i] = new Path();
    myPath[i].strokeColor = color;
    // myPath[i].fullySelected = true;

    x1 = firstPoint.x+(i*8)+(Math.random()*5)-5;
    y1 = firstPoint.y+(Math.random()*5)-5;
    
    myPath[i].add(x1, y1);

    for(var j=1;j<11;j++) {
      x = x1+(Math.random()*5)-5;
      p = new Point(x, y1+(j*size/10));
      myPath[i].add(p);
    }

    myPath[i].smooth();

    linesPatternGroup.addChild(myPath[i]);
  }

}

function generateArt() {

  project.clear()

  var canvas = document.getElementById("myCanvas");

  fillBackground('#F2EEE9', canvas);

  elementCount = getRandomNumber(1,5);

  for(var i=0; i < elementCount; i++) {

    selectElement = Math.floor(Math.random() * 4);

    switch(selectElement) {
     case 0:
       makeSemiCircle();
       break;
     case 1:
       makeCircle();
       break;
     case 2:
       makeLinesPattern();
       break;

    case 3:
      makeCircleScribble();
      break;
    }
     
  }

  view.draw();
  // console.log(project.activeLayer.children.length);
}

function animation() {
  view.onFrame = function(event) {

    if(Math.floor(event.time) != 0 && Math.floor(event.count)%125 == 0) {
      generateArt();
    }

    for(i=1;i<project.activeLayer.children.length;i++) {
      project.activeLayer.children[i].rotate(1.4*i);
    }
  }
}

function stopAnimation() {
  view.detach('frame', this.onFrame);
}