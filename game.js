const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const ratImg = new Image();
ratImg.src = "rat.png";

ratImg.onload = () => {
  console.log("Rat chargé !");
};

//rat
const player = {
    x: 100,
    y: canvas.height / 2,
    width: 150,
    height: 350,
    velocityY: 0,
    gravity: 800,
    jumpForce: -350
};


const obstacle = {
  x: canvas.width,
  y: canvas.height - 150,
  width: 60,
  height: 150,
  speed: 500
};


window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        player.velocityY = player.jumpForce;
    }
});

window.addEventListener("mousedown", () => {
  player.velocityY = player.jumpForce;
});


function update(deltaTime) {
    player.velocityY += player.gravity * deltaTime;
    player.y += player.velocityY * deltaTime;
        if (player.y + player.height > canvas.height) {
            player.y = canvas.height - player.height;
            player.velocityY = 0;
        }
    obstacle.x -= obstacle.speed * deltaTime;
        if (obstacle.x + obstacle.width < 0) {
            obstacle.x = canvas.width;
        }
}

function draw() {

  // fond
  ctx.fillStyle = "#a78484";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

    //sol
  ctx.fillRect(0, canvas.height - 20, canvas.width, 20);

    // obstacle (os / intestin)
    ctx.fillStyle = "#e8e2d0";
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

  //rat
  ctx.drawImage(
    ratImg,
    player.x,
    player.y,
    player.width,
    player.height
  );
}

let lastTime = 0;

function gameLoop(time) {

  const deltaTime = (time - lastTime) / 1000;
  lastTime = time;

  update(deltaTime);
  draw();

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);