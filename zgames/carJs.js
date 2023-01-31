document.addEventListener("DOMContentLoaded", () => {
  const road = document.querySelector(".road");
  const car = document.createElement("div");

  let carBottom = 160;
  let carRight = 20;
  let carWidth = 80;
  let carHeight = 50;
  let carCount = 4;

  let VCarWidth = 80;
  let VCarHeight = 50;
  let VCars = [];
  let speed = 2.4;
  let isGameOver = false;

  let movingTimer;
  let score = 0;

  function createCar() {
    road.appendChild(car);
    car.classList.add("car");
    car.style.bottom = carBottom + "px";
    car.style.right = carRight + "px";
  }
  class care {
    constructor(newCarRight) {
      this.bottom = 50 + 58 * Math.random() * 4;
      this.right = newCarRight + 120;
      this.visual = document.createElement("div");

      const visual = this.visual;
      visual.style.right = this.right + "px";
      visual.style.bottom = this.bottom + "px";
      visual.classList.add("VCar");
      road.appendChild(visual);
    }
  }

  function createCars() {
    for (let i = 0; i < carCount; i++) {
      let carGap = 800 / carCount;
      let newCarRight = 200 + i * carGap;
      let newCar = new care(newCarRight);
      VCars.push(newCar);
      // console.log(newCar);
    }
  }

  function moveCars() {
    VCars.forEach((VCar) => {
      VCar.right -= speed;
      let visual = VCar.visual;
      visual.style.right = VCar.right + "px";

      if (
        VCar.right <= carRight + carWidth &&
        VCar.right + VCarWidth >= carRight &&
        VCar.bottom <= carBottom + carHeight &&
        VCar.bottom + VCarHeight >= carBottom
      ) {
        gameOver();
      }
      if (VCar.right < -40) {
        let firstCar = VCars[0].visual;
        score++;
        firstCar.classList.remove("VCar");
        VCars.shift();
        let newCars = new care(800);
        VCars.push(newCars);
      }
    });
  }

  function gameOver() {
    console.log("game-over");
    isGameOver = true;
    clearInterval(movingTimer);
    while (road.firstChild) {
      road.removeChild(road.firstChild);
    }
    road.innerHTML = "your score is " + score;
    document.road.style.background = red;
  }
  function moveUp() {
    if (carBottom < 280) {
      carBottom += 20;
      car.style.bottom = carBottom + "px";
    }
  }

  function moveBottom() {
    if (carBottom > 40) {
      carBottom -= 20;
      car.style.bottom = carBottom + "px";
    }
  }

  function moveRight() {
    if (carRight > 25) {
      carRight -= 20;
      car.style.right = carRight + "px";
    }
  }
  function moveLeft() {
    if (carRight < 700) {
      carRight += 20;
      car.style.right = carRight + "px";
    }
  }
  function control(e) {
    if (e.key === "ArrowUp") {
      moveUp();
    } else if (e.key === "ArrowDown") {
      moveBottom();
    } else if (e.key === "ArrowRight") {
      moveRight();
    } else if (e.key === "ArrowLeft") {
      moveLeft();
    }
  }
  function start() {
    if (!isGameOver) {
      createCar();
      createCars();
      movingTimer = setInterval(moveCars, 30);
      document.addEventListener("keyup", control);
    }
  }
  start();
});

// class care {
//   constructor;
// }
