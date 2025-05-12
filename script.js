// Canvas related code

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// canvas.style.width = winndow.innerWidth + 'px';
// canvas.style.height = winndow.innerHeight + 'px';

let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);


class Triangle {
  
  constructor(x, y, sideLength, widthOffset) {
    this.x = x;
    this.y = y;
    this.sideLength = sideLength;
    this.widthOffset = widthOffset;
    this.colour = null;
    this.triHeight = (this.sideLength * Math.sqrt(3)) / 2;
    this.gradient1 = 0;
    this.gradient2 = 0.2;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.colour;
    //Starting point of triangle is the bottom corner
    ctx.moveTo(this.x, this.y);
    //line to the left corner of triangle
    ctx.lineTo(this.x - (this.sideLength / 2), this.y - this.triHeight);
    //line to right corner of triangle
    ctx.lineTo(this.x + (this.sideLength / 2), this.y - this.triHeight);
    ctx.fill();
  }
  
//update function to set current width of no parameters
  updateSizes(){
    this.x = (width * this.widthOffset);
    this.y = height;
    this.sideLength = (width * 0.03); 
    this.triHeight = (this.sideLength * Math.sqrt(3)) / 2;
  }

  updateGradient() {
    const gradient = ctx.createLinearGradient(this.x, (this.y - this.triHeight), this.x, this.y);
    gradient.addColorStop(this.gradient1, "blue");
    gradient.addColorStop(this.gradient2, "white");
    this.gradient2 = (this.gradient2 >= 0.995) ? 0 : this.gradient2 + 0.005;
    this.colour = gradient;
  }
}

const gradient = "red";
const triangles = [];
const triVariables = [
  {x: (width * 0.25), y: (height * 0.85), sideLength: (width * 0.03), widthOffset: 0.25},
  {x: (width * 0.50), y: (height * 0.85), sideLength: (width * 0.03), widthOffset: 0.50},
  {x: (width * 0.75), y: (height * 0.85), sideLength: (width * 0.03), widthOffset: 0.75}
];

triVariables.forEach(triangle => {
    triangles.push(new Triangle(triangle.x, triangle.y, triangle.sideLength, triangle.widthOffset));
})

function initialise() {
  window.addEventListener('resize', updateCanvas);
  updateCanvas();
}

function updateCanvas() {
  if (width !== window.innerWidth || height !== window.innerHeight){
    width = (canvas.width = window.innerWidth);
    height = (canvas.height = window.innerHeight);

  }

  ctx.clearRect(0, 0, width, height);

  for (const triangle of triangles){
    triangle.draw();
    triangle.updateSizes();
    triangle.updateGradient();
  }

  requestAnimationFrame(updateCanvas);

}

updateCanvas();


// contact form
const form = document.querySelector(".contact__form");
const formUserName = document.getElementById("name");
const formUserEmail = document.getElementById("email");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!formUserName.validity.valid || !formUserEmail.validity.valid) {
    console.log("Not valid");
    //Add custom validation msg code here
    return;
  } else {
    try{
      console.log("It worked! Now sending form");
      const formData = new FormData(form);
      //formData = form. something <--- 
      const response = await fetch("api.jordan-young.com/form-submission", {
        method: "POST",
        body: formData,
      });

      const responseJSON = await response.json();
      console.log(`${responseJSON.message} + ${response.status}`);

      if (!response.ok){
        throw new Error(`HTTP error. ${response.status}`);
      }

    } catch(error) {
      console.log(`Failed to submit form. Error: ${error}`);
      //Add custom error msg here
    }

  }
})
