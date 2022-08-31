export default class Master {
  #box;
  #food;
  #score;
  #groundImage;
  #foodImage;
  #snakeHeadImage;
  #snakeBodyImage;
  #direction;

  constructor(box, groundImage, foodImage, snakeHeadImage, snakeBodyImage) {
    this.#box = box;
    this.#groundImage = new Image();
    this.#groundImage.src = groundImage;
    this.#foodImage = new Image();
    this.#foodImage.src = foodImage;
    this.#snakeHeadImage = new Image();
    this.#snakeHeadImage.src = snakeHeadImage;
    this.#snakeBodyImage = new Image();
    this.#snakeBodyImage.src = snakeBodyImage;
    this.#direction = "";
    this.snake = [{ x: 9 * this.#box, y: 10 * this.#box }];
    this.step = this.step.bind(this);
    this.#food = {
      x: Math.floor(Math.random() * 17 + 1) * this.#box,
      y: Math.floor(Math.random() * 15 + 3) * this.#box,
    };
    this.#score = 0;
  }

  render(ctx) {
    ctx.drawImage(this.#groundImage, 0, 0);
    // ctx.drawImage(this.#snakeHeadImage, 9 * this.#box, 10 * this.#box);

    ctx.fillText(`Score: ${this.#score}`, this.#box * 2.5, this.#box * 1.6);
    ctx.font = "30px Arial";
    ctx.fillStyle = "#ECF4FF";
    ctx.drawImage(this.#snakeHeadImage, this.snake[0].x, this.snake[0].y);
    ctx.drawImage(this.#foodImage, this.#food.x, this.#food.y);
    this.#alwayStep();
    this.#eat();

    ctx.fill();
  }

  #restart() {}
  #gameOver() {}
  #alwayStep() {
    if (this.#direction === "ArrowDown") {
      this.snake[0].y += this.#box;
    } else if (this.#direction === "ArrowUp") {
      this.snake[0].y -= this.#box;
    } else if (this.#direction === "ArrowLeft") {
      this.snake[0].x -= this.#box;
    } else if (this.#direction === "ArrowRight") {
      this.snake[0].x += this.#box;
    }
  }
  step({ code }) {
    if (
      code == "ArrowDown" ||
      code == "ArrowUp" ||
      code == "ArrowLeft" ||
      code == "ArrowRight"
    ) {
      this.#direction = code;
    }
  }
  #eat() {
    if (this.snake[0].x == this.#food.x && this.snake[0].y == this.#food.y) {
      this.#score++;
      this.#food = {
        x: Math.floor(Math.random() * 17 + 1) * this.#box,
        y: Math.floor(Math.random() * 15 + 3) * this.#box,
      };
    } else {
      // snakeSpawn.pop();
    }
  }
  #dead() {}
  #addSizeSnake() {}
}

let x = {
  game: true,
  snake: [{}],
  score: 0,
  food: {},
};

// snakeSpawn[0] = {
//   x: 9 * BOX,
//   y: 10 * BOX,
// };

// function drawGame() {
//   ctx.drawImage(ground, 0, 0);
// }
