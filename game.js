const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Image du rat
const ratImg = new Image();
ratImg.src = "rat.png";

// Joueur et niveau
const player = new Rat(100, canvas.height / 2, 100, 80);
const lev1 = new Level(1);
let obstacles = lev1.game(canvas.width, canvas.height);
let gameOver = false;

// Contrôles
window.addEventListener("keydown", (e) => {
    if (e.code === "Space") player.jump();
});
window.addEventListener("mousedown", () => player.jump());

// Redimensionnement
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function update(deltaTime) {
    if (gameOver) return;

    // Gravité et mouvement
    player.velocityY += player.getGravity() * deltaTime;
    player.posY += player.velocityY * deltaTime;

    // Gestion du sol
    const ground = canvas.height - 20;
    if (player.getPosY() + player.getHeight() > ground) {
        player.setPosY(ground - player.getHeight());
        player.velocityY = 0;
    }

    // Mise à jour des obstacles
    for (let i = obstacles.length - 1; i >= 0; i--) {
        const obstacle = obstacles[i];
        obstacle.shift(deltaTime);

        // Supprimer les obstacles hors écran
        if (obstacle.getPosX() + obstacle.getWidth() < 0) {
            obstacles.splice(i, 1);
            continue;
        }

        // Score
        if (obstacle.getPosX() + obstacle.getWidth() < player.getPosX() && !obstacle.passed) {
            obstacle.passed = true;
            lev1.score += 1;
        }

        // Collision
        if (player.obstacle(obstacle)) {
            gameOver = true;
            sauvegarder(lev1.intensity, lev1.score);
        }
    }

    // Régénérer les obstacles quand ils sont tous passés
    if (obstacles.length === 0) {
        obstacles = lev1.game(canvas.width, canvas.height);
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Fond
    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Sol
    ctx.fillStyle = "#a78484";
    ctx.fillRect(0, canvas.height - 20, canvas.width, 20);

    // Rat
    ctx.drawImage(
        ratImg,
        player.getPosX(),
        player.getPosY(),
        player.getWidth(),
        player.getHeight()
    );

    // Obstacles
    ctx.fillStyle = "#e8e2d0";
    for (const obstacle of obstacles) {
        ctx.fillRect(
            obstacle.getPosX(),
            obstacle.getPosY(),
            obstacle.getWidth(),
            obstacle.getHeight()
        );
    }

    // Score
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText("Score : " + lev1.score, 20, 40);

    // Game Over
    if (gameOver) {
        ctx.fillStyle = "rgba(0,0,0,0.6)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.font = "60px Arial";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
        ctx.font = "30px Arial";
        ctx.fillText("Score final : " + lev1.score, canvas.width / 2, canvas.height / 2 + 60);
    }
}

let lastTime = null;

function gameLoop(timestamp) {
    if (lastTime === null) {
        lastTime = timestamp;
    }
    const deltaTime = Math.min((timestamp - lastTime) / 1000, 0.05);
    lastTime = timestamp;
    update(deltaTime);
    draw();
    requestAnimationFrame(gameLoop);
}

ratImg.onload = () => requestAnimationFrame(gameLoop);

ratImg.onerror = () => {
    console.error("rat.png introuvable ! Vérifiez le nom du fichier.");
    requestAnimationFrame(gameLoop);
};