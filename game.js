const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//image du rat
const ratImg = new Image();
ratImg.src = "rat.png";

ratImg.onload = () => {
    console.log("Rat image loaded successfully.");
};

//rat
const player = new Rat(100,canvas.height / 2,350,150);

//obstacle
const obstacle = new Obstacle(canvas.width,canvas.height-150,150,50,300);

window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        player.jump();
    }
});

function update(deltaTime) {
    player.velocityY += player.getGravity() * deltaTime;
    player.y += player.velocityY * deltaTime;
    const ground = canvas.height - 20;
        if (player.getPosY() + player.getHeight() > ground) {
            player.setPosY(ground - player.getHeight());
            player.velocityY = 0;
        }
    player.obstacle(obstacle);
    obstacle.shift(deltaTime);
    if (obstacle.getPosX() + obstacle.getWidth() < 0) {
        obstacle.setPosX(canvas.width + Math.random() * 300);
    }
}

//partie graphique
function draw() {
    //fond
    ctx.fillStyle = "#a78484";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //sol
    ctx.fillRect(0, canvas.height - 20, canvas.width, 20);

    // obstacle (os / intestin)
    ctx.fillStyle = "#e8e2d0";
    ctx.fillRect(obstacle.getPosX(), obstacle.getPosY(), obstacle.getWidth(), obstacle.getHeight());

    //rat
    ctx.drawImage(
        ratImg,
        player.getPosX(),
        player.getPosY(),
        player.getWidth(),
        player.getHeight()
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
