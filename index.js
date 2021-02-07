const canvas = document.querySelector("canvas");

// defining the size of the canvas
canvas.width = 500
canvas.height = 300

// reassigning here, so its easier to refer back to it.
let width = canvas.width
let height = canvas.height

let ctx = canvas.getContext('2d');

// empty array of circles, which we will populate with individual circles
let circles = [];

// circle object will contain x-coordinate, y-coordinate and r(radius)
let circle = {};
let overlapping = false;
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

const checkBorder = function(circle,x1 = 0, x2 = width, y1 = 0, y2 = height) {
  let radius = circle.r + 5
  return circle.y - y1 > radius && circle.x - x1 > radius && x2 - circle.x > radius && y2 - circle.y > radius
}

// Generating array of circles
while (circles.length < numCircles &&
         counter < protection) {
    circle = {
      x: random(width),
      y: random(height),
      r: random(30)
    };
    overlapping = false;

    // check that it is not overlapping with any existing circle
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

  let inCanvasCircles = []

  for (let i = 0; i < circles.length; i++) {
    let existing = circles[i]

    // check whether the x is close to 0 or canvas width
    // check whether the y is close to 0 or canvas height
    // difference needs to be at least r + 5px
    // let radius = existing.r + 5

    // if (existing.y - 0 > radius && existing.x - 0 > radius && width - existing.x > radius && height - existing.y > radius) {
    //   inCanvasCircles.push(existing)
    // }
  if (checkBorder(existing)) {
      inCanvasCircles.push(existing)
    }
  }

  // Now we are getting an array of circles, each circle has an x, y and a r (radius)
circles = inCanvasCircles

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
