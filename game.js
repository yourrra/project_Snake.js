import Master from "./master.js";
function GAME() {
  document.getElementById("start").disabled = true;
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  const game = new Master(
    32,
    "./img/ground.png",
    "./img/food.png",
    "./img/snakeHead.png",
    "./img/snakeBody.png",
    ctx
  );

  document.addEventListener("keydown", game.step);

  const interval = setInterval(game.render, 100);

  game.gameOver(interval);
}
GAME = GAME.bind(this);
document.getElementById("start").addEventListener("click", () => {
  GAME();
});
