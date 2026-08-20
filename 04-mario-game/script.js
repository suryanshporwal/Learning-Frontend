let gamebox = document.getElementById("gamebox");
let context = gamebox.getContext("2d");

let marioImage = new Image();
marioImage.src = "mario.svg";

let turtleImage = new Image();
turtleImage.src = "bowser.svg";

let gameoverImage = new Image();
gameoverImage.src = "gameover.png";

let gameImage = new Image();
gameImage.src = "super-mario-logo.svg";

let score = 0;

gamebox.addEventListener("click", () => {
  if (gameOver) {
    gameOver = false;
    resetGame();
    updateGame();
  }
});

document.addEventListener("keydown", ()=>{
  if (gameOver) {
    gameOver = false;
    resetGame();
    updateGame();
  }
  else movePlayer();
});

function movePlayer() {
  if (gameOver) return;
  player.x += player.vx;

  if (player.x + player.w > gamebox.width || player.x < 0) {
    if (player.x < 0) {
      score++;
      console.log(score);
      marioImage.src = "mario.svg";
    } else {
      marioImage.src = "mario_left.svg";
    }
    player.vx *= -1;
  }
}

let gameOver = false;

let enemy1 = {
  x: 180,
  y: 0,
  h: 60,
  w: 60,
  vx: 0,
  vy: 3,
};

let enemy2 = {
  x: 370,
  y: 0,
  h: 60,
  w: 60,
  vx: 0,
  vy: 5,
};

let player = {
  x: 0,
  y: 270,
  h: 50,
  w: 50,
  vx: 15,
  vy: 0,
};

function checkGameOverForEnemy(enemy) {
  if (
    enemy.x < player.x &&
    player.x < enemy.x + enemy.w &&
    player.y > enemy.y &&
    player.y < enemy.y + enemy.h
  ) {
    gameOver = true;
    return;
  } else if (
    player.y + player.h < enemy.y + enemy.h &&
    player.y + player.h > enemy.y &&
    enemy.x < player.x &&
    player.x < enemy.x + enemy.w
  ) {
    gameOver = true;
    return;
  } else if (
    player.x + player.w > enemy.x &&
    player.x + player.w < enemy.x + enemy.w &&
    player.y + player.h > enemy.y &&
    player.y + player.h < enemy.y + enemy.h
  ) {
    gameOver = true;
    return;
  } else if (
    player.y > enemy.y &&
    player.y < enemy.y + enemy.h &&
    player.x + player.w > enemy.x &&
    player.x + player.w < enemy.x + enemy.w
  ) {
    gameOver = true;
    return;
  }
}

function resetGame() {
  // update mario position to initial position
  player.x = 0;
  player.vx = 15;
  marioImage.src = "mario.svg";

  // Update enemy positions to initial positions
  enemy1.y = 0;
  enemy2.y = 0;
}

function checkGameOver() {
  checkGameOverForEnemy(enemy1);
  checkGameOverForEnemy(enemy2);
}

function gameOverOverlay() {
  context.drawImage(gameoverImage, 230, 180, 240, 200);
}

function updateGameState() {
  enemy1.y += enemy1.vy;
  enemy2.y += enemy2.vy;

  if (enemy1.y + enemy1.h > gamebox.height || enemy1.y < 0) {
    enemy1.vy *= -1;
  }

  if (enemy2.y + enemy2.h > gamebox.height || enemy2.y < 0) {
    enemy2.vy *= -1;
  }

  checkGameOver();
}

function updateGame() {
  if (gameOver) {
    gameOverOverlay();
    console.log("Final Score: ", score);
    score = 0;
    return;
  }
  // Update the game state
  updateGameState();

  // Clear canvas
  context.clearRect(0, 0, gamebox.width, gamebox.height);

  context.drawImage(gameImage, 280, 10, 120, 60);

  // Draw Mario
  context.drawImage(marioImage, player.x, player.y, player.w, player.h);

  // Draw Bowser
  context.drawImage(turtleImage, enemy1.x, enemy1.y, enemy1.w, enemy1.h);
  context.drawImage(turtleImage, enemy2.x, enemy2.y, enemy2.w, enemy2.h);

  window.requestAnimationFrame(updateGame);
}

updateGame();
