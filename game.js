let gameStarted = false;
let currentLevel = 1;

function nouvellePartie() {
    document.getElementById("menuScreen").style.display = "none";
    gameStarted = true;
    gameOver = false;
    lev1.score = 0;
    player.posY = canvas.height / 2;
    player.velocityY = 0;
    obstacles = lev1.game(canvas.width, canvas.height);
}

function reprendrePartie() {
    const sauvegarde = charger(); // votre fonction de chargement
    if (sauvegarde) {
        document.getElementById("menuScreen").style.display = "none";
        gameStarted = true;
        // appliquer la sauvegarde
    } else {
        alert("Aucune partie sauvegardée !");
    }
}

function choixNiveau() {
    document.getElementById("menuScreen").style.display = "none";
    document.getElementById("levelScreen").style.display = "flex";
}

function lancerNiveau(n) {
    currentLevel = n;
    document.getElementById("levelScreen").style.display = "none";
    gameStarted = true;
    gameOver = false;
    // adapter la difficulté selon n
}

function retourMenu() {
    document.getElementById("levelScreen").style.display = "none";
    document.getElementById("menuScreen").style.display = "flex";
}

const bgImg = new Image();
bgImg.src = "horror_level.png"; 
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const obstacleImg = new Image();
obstacleImg.src = "obstacles_evil.png";

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Image du rat
const ratFrames = [];
const ratImg1 = new Image();
const ratImg2 = new Image();
const ratImg3 = new Image();
ratImg1.src = "rat_evil.png";
ratImg2.src = "rat_evil_1.png";
ratImg3.src = "rat_evil_2.png"
ratFrames.push(ratImg1, ratImg2, ratImg3);

let currentFrame = 0;
let frameTimer = 0;
const frameInterval = 30;

// Joueur et niveau
const player = new Rat(100, canvas.height / 2, 100, 150);
const lev1 = new Level(1);
let obstaclesBottom = lev1.obstaclesBottom(canvas.width, canvas.height);
let obstaclesTop = lev1.obstaclesTop(canvas.width, canvas.height);
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
    // Gestion du plafond
    const ceiling = 20;
    if (player.getPosY() <= ceiling) {
        player.setPosY(ceiling);
        player.velocityY = 0;
    }

    // Mise à jour des obstacles
    for (let i = obstaclesTop.length - 1; i >= 0; i--) {
        const obstacleTop = obstaclesTop[i];
        obstacleTop.shift(deltaTime);

        const obstacleBottom = obstaclesBottom[i];
        obstacleBottom.shift(deltaTime);

        // Supprimer les obstacles hors écran
        if (obstacleTop.getPosX() + obstacleTop.getWidth() < 0) {
            obstaclesTop.splice(i, 1);
            obstaclesBottom.splice(i,1);
            continue;
        }

        // Score
        if (obstacleTop.getPosX() + obstacleTop.getWidth() < player.getPosX() && !obstacleTop.passed) {
            obstacleTop.passed = true;
            lev1.score += 1;
        }

        // Collision
        if (player.obstacle(obstacleTop) || player.obstacle(obstacleBottom)) {
            gameOver = true;
            sauvegarder(lev1.intensity, lev1.score);
        }
    }

    // Régénérer les obstacles quand ils sont tous passés
    if (obstaclesTop.length === 0 || obstaclesBottom.length === 0) {
        obstaclesTop = lev1.obstaclesTop(canvas.width, canvas.height);
        obstaclesBottom = lev1.obstaclesBottom(canvas.width, canvas.height);
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Fond
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

    // Sol
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, canvas.height - 20, canvas.width, 20);
    //Plafond
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,canvas.width,20);

    // rat
    frameTimer++;
        if (frameTimer >= frameInterval) {
            currentFrame = (currentFrame + 1) % ratFrames.length;
            frameTimer = 0;
        }
    ctx.drawImage(
        ratFrames[currentFrame],
        player.getPosX(),
        player.getPosY(),
        player.getWidth(),
        player.getHeight()
    );

    // Obstacles
    for (const obstacle of obstaclesTop) {
        ctx.drawImage(
            obstacleImg,
            obstacle.getPosX(),
            obstacle.getPosY(),
            obstacle.getWidth(),
            obstacle.getHeight()
        );
    }

    for (const obstacle of obstaclesBottom) {
        ctx.drawImage(
            obstacleImg,
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

let imagesChargees = 0;
const totalImages = ratFrames.length + 2;

function imageChargee() {
    imagesChargees++;
    if (imagesChargees >= totalImages) {
        requestAnimationFrame(gameLoop);
    }
}

ratImg1.onload = imageChargee;
ratImg2.onload = imageChargee;
ratImg3.onload = imageChargee;
bgImg.onload = imageChargee;
obstacleImg.onload = imageChargee;

 