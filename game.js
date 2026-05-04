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
const lev1 = new Level(1);
const obstacles = lev1.game(canvas.width,canvas.height);

window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        player.jump();
    }
});

function update(deltaTime) {
    player.velocityY += player.getGravity() * deltaTime;
    player.y += player.velocityY * deltaTime;
    if (player.getPosY() + player.getHeight() > canvas.height) {
        player.setPosY(canvas.height - player.getHeight());
        player.velocityY = 0;
    }
    let obstaclesDraw = [];
    for (const obstacle of obstacles){
        player.obstacle(obstacle);
        obstacle.shift(deltaTime);
        if (obstacle.getPosX() < canvas.width) {
            obstacleDraw.push(...obstaclesDraw, obstacle);
        }
    }
    drawRectangle(obstaclesDraw)    
}

//partie graphique
function draw() {
    //rat
    ctx.drawImage(
        ratImg,
        player.getPosX(),
        player.getPosY(),
        player.getWidth(),
        player.getHeight()
    );
}

function drawRectangle(obstacles){
    for (const obstacle of obstacles){
        ctx.fillStyle = "#a78484";
        ctx.fillRect(0, 0, canvas.height - 20, canvas.width, 20);

        //sol
        ctx.fillRect(0, canvas.height - 20, canvas.width, 20);

        // obstacle (os / intestin)
        ctx.fillStyle = "#e8e2d0";
        ctx.fillRect(obstacle.getPosX(), obstacle.getPosY(), obstacle.getWidth(), obstacle.getHeight());
    }
}