export default class Master {
  #box;
  #food;
  #score;
  #groundImage;
  #foodImage;
  #snakeHeadImage;
  #snakeBodyImage;
  #direction;
  #ctx;
  #interval;

  constructor(
    box,
    groundImage,
    foodImage,
    snakeHeadImage,
    snakeBodyImage,
    ctx
  ) {
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
    this.#ctx = ctx;
    this.render = this.render.bind(this);
    this.#ctx.font = "30px Arial";
    this.#ctx.fillStyle = "#ECF4FF";
  }

  render() {
    this.#alwayStep();
    this.#border();
    this.#renderImage.call(this);
    this.#eat();
  }

  #renderImage() {
    this.#ctx.save();
    this.#ctx.drawImage(this.#groundImage, 0, 0);
    this.snake.map((_, index) => {
      if (index === 0) {
        this.#ctx.drawImage(
          this.#snakeHeadImage,
          this.snake[0].x,
          this.snake[0].y
        );
      } else {
        this.#ctx.drawImage(
          this.#snakeBodyImage,
          this.snake[index].x,
          this.snake[index].y
        );
      }
    });
    this.#ctx.drawImage(this.#foodImage, this.#food.x, this.#food.y);
    this.#ctx.fillText(
      `Score: ${this.#score}`,
      this.#box * 2.5,
      this.#box * 1.6
    );
    this.#ctx.restore();
  }
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
  #border() {
    this.snake.map((element, index) => {
      if (index !== 0) {
        if (this.snake[0].x === element.x && this.snake[0].y === element.y) {
          this.#dead();
        }
      }
    });
    if (
      this.snake[0].x > 17 * this.#box ||
      this.snake[0].x < this.#box ||
      this.snake[0].y > 17 * this.#box ||
      this.snake[0].y < 3 * this.#box
    ) {
      this.#dead();
    }
  }
  step({ code }) {
    if (
      (code == "ArrowDown" && this.#direction !== "ArrowUp") ||
      (code == "ArrowUp" && this.#direction !== "ArrowDown") ||
      (code == "ArrowLeft" && this.#direction !== "ArrowRight") ||
      (code == "ArrowRight" && this.#direction !== "ArrowLeft")
    ) {
      this.#direction = code;
    }
  }
  #eat() {
    this.snake.unshift(Object.assign({}, this.snake[0]));
    if (this.snake[0].x == this.#food.x && this.snake[0].y == this.#food.y) {
      this.#score++;
      this.#food = {
        x: Math.floor(Math.random() * 17 + 1) * this.#box,
        y: Math.floor(Math.random() * 15 + 3) * this.#box,
      };
    } else {
      this.snake.pop();
    }
  }
  #dead() {
    alert(`Game Over, you score was ${this.#score} click Ok to restart!`);
    clearInterval(this.#interval);
    document.getElementById("start").disabled = false;
  }
  gameOver(interval) {
    this.#interval = interval;
  }
}
