const canvas = document.querySelector("canvas");

console.log(canvas)

canvas.width = 500
canvas.height = 300

let ctx = canvas.getContext('2d');

let circles = [];
let circle = {};
let overlapping = false;
let outOfCanvas = false;
let numCircles = Math.floor(Math.random() * 40 + 15);
let counter = 0;
let protection = 10000;


// Function to generate a random number.
const random = function(num) {
  return Math.floor(Math.random() * num)
}

// Calculating the distance between points.
const dist = function(x1, y1, z1, x2, y2, z2) {
  if (arguments.length === 4) {
    // In the case of 2d: z1 means x2 and x2 means y2
    return Math.sqrt( (z1-x1)*(z1-x1) + (x2-y1)*(x2-y1) );
  } else if (arguments.length === 6) {
    return Math.sqrt( (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1) + (z2-z1)*(z2-z1) );
  }
}


// Generating array of circles
while (circles.length < numCircles &&
         counter < protection) {
    circle = {
      x: random(490) - 10,
      y: random(350) - 10,
      r: random(30)
    };
    overlapping = false;

    // check that it is not overlapping with any existing circle
    // another brute force approach
    for (let i = 0; i < circles.length; i++) {
      let existing = circles[i];
      let d = dist(circle.x, circle.y, existing.x, existing.y)
      if (d < circle.r + existing.r) {
        // They are overlapping
        overlapping = true;
        // do not add to array
        break;
      }
    }

    // add valid circles to array
    if (!overlapping) {
      circles.push(circle);
    }

    counter++;
  }

  // Now we are getting an array of circles, each circle has an x, y and a r (radius)
  console.log(circles)

  ctx.fillRect(0, 299, 1, 1)

  // Drawing in H5
  const brandColors = ["#b63393", "#d66aa9", "#b9cce3", "#cadfb7", "#d6e2a4"]
  for (var i = 0; i < circles.length; i++) {
    ctx.beginPath();
    ctx.arc(circles[i].x, circles[i].y, circles[i].r, 0, Math.PI * 2, false)
    // ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = brandColors[Math.floor(Math.random() * 5)]
    ctx.fill()
  }
