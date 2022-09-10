import Master from "./master.js";
let lvl = 50;
document.querySelector('.lvl').addEventListener('change', ()=>{
  lvl = document.querySelector('.lvl').value
  document.querySelector('.lvlSize').innerText = "Level: " + lvl;
})
function GAME() {
  const fps_size = {
    "1": 1,
    "2": 2,
    "3": 4,
    "4": 8,
    "5": 16,
  }
  const fps = fps_size[String(document.querySelector(".fps").value)];
  document.getElementById("start").disabled = true;
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  const game = new Master(
    Number(fps),
    32,
    "./img/ground.png",
    "./img/food.png",
    "./img/snakeHead.png",
    "./img/snakeBody.png",
    ctx
  );

  document.addEventListener("keydown", game.step);

  const interval = setInterval(game.render, lvl / fps);

  game.gameOver(interval);
}
GAME = GAME.bind(this);
document.getElementById("start").addEventListener("click", () => {
  GAME();
});
