import Master from "./master.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const game = new Master(
  32,
  "./img/ground.png",
  "./img/food.png",
  "./img/snakeHead.png",
  "./img/snakeBody.png"
);

document.addEventListener("keydown", game.step);

const interval = setInterval(() => {
  game.render(ctx);
}, 200);
