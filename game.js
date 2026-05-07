class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.bgImg = new Image();
        this.bgImg.src = "images/horror_level.png";

        this.ratFrames = [];
        this.obstacleTopImgs = [];
        this.obstacleBottomImgs = [];

        this.currentFrame = 0;
        this.frameTimer = 0;
        this.frameInterval = 40;
        this.player = null;
        this.currentLev = null;
        this.obstaclesTop = [];
        this.obstaclesBottom = [];
        this.gameOver = false;
        this.lastTime = null;
    }

    loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Image introuvable : ${src}`));
        });
    }

    async loadAssets() {
        const topSrc = [
            "images/obstacles_top_evil.png",
            "images/obstacles_top_evil_1.png",
            "images/obstacles_top_evil_2.png"
        ];
        const bottomSrc = [
            "images/obstacles_bottom_evil.png",
            "images/obstacles_bottom_evil_1.png",
            "images/obstacles_bottom_evil_2.png"
        ];
        const ratSrc = [
            "images/rat_evil.png",
            "images/rat_evil_1.png",
            "images/rat_evil_2.png"
        ];

        const promises = [];
        promises.push(this.loadImage(this.bgImg.src).then(img => { this.bgImg = img; }));

        for (const src of topSrc) {
            promises.push(this.loadImage(src).then(img => this.obstacleTopImgs.push(img)));
        }

        for (const src of bottomSrc) {
            promises.push(this.loadImage(src).then(img => this.obstacleBottomImgs.push(img)));
        }
        for (const src of ratSrc) {
            promises.push(this.loadImage(src).then(img => this.ratFrames.push(img)));
        }

        await Promise.all(promises);
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    resetLevel(level) {
        this.currentLev = new Level(level);
        this.player = new Rat(100, this.canvas.height / 2, 100, 150);
        this.obstaclesBottom = this.currentLev.obstaclesBottom(this.canvas.width, this.canvas.height);
        this.obstaclesTop = this.currentLev.obstaclesTop(this.canvas.width, this.canvas.height);
        this.gameOver = false;
        this.lastTime = null;
        this.currentFrame = 0;
        this.frameTimer = 0;
    }

    loadSavedLevel() {
        const sauvegarde = charger();
        return sauvegarde ? sauvegarde.currentLevel : null;
    }

    startLevel(level) {
        this.currentLevel = level;
        this.resetLevel(level);
        this.startLoop();
    }

    startLoop() {
        this.lastTime = null;
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    update(deltaTime) {
        if (this.gameOver) return;

        this.player.velocityY += this.player.getGravity() * deltaTime;
        this.player.posY += this.player.velocityY * deltaTime;

        const ground = this.canvas.height - 20;
        if (this.player.getPosY() + this.player.getHeight() > ground) {
            this.player.setPosY(ground - this.player.getHeight());
            this.player.velocityY = 0;
        }

        const ceiling = 20;
        if (this.player.getPosY() <= ceiling) {
            this.player.setPosY(ceiling);
            this.player.velocityY = 0;
        }

        for (let i = this.obstaclesTop.length - 1; i >= 0; i--) {
            const obstacleTop = this.obstaclesTop[i];
            const obstacleBottom = this.obstaclesBottom[i];

            obstacleTop.shift(deltaTime);
            obstacleBottom.shift(deltaTime);

            if (obstacleTop.getPosX() + obstacleTop.getWidth() < 0 && obstacleBottom.getPosX() + obstacleBottom.getWidth() < 0) {
                this.obstaclesTop.splice(i, 1);
                this.obstaclesBottom.splice(i, 1);
                continue;
            }

            if (obstacleTop.getPosX() + obstacleTop.getWidth() < this.player.getPosX() && !obstacleTop.passed) {
                obstacleTop.passed = true;
                this.currentLev.score += 1;
            }

            if (this.player.obstacle(obstacleTop) || this.player.obstacle(obstacleBottom)) {
                this.gameOver = true;
                sauvegarder(this.currentLev.intensity, this.currentLev.score);
            }
        }

        if (this.obstaclesTop.length === 0 || this.obstaclesBottom.length === 0) {
            this.obstaclesBottom = this.currentLev.obstaclesBottom(this.canvas.width, this.canvas.height);
            this.obstaclesTop = this.currentLev.obstaclesTop(this.canvas.width, this.canvas.height);
        }
    }

    gameLoop(timestamp) {
        if (this.lastTime === null) {
            this.lastTime = timestamp;
        }
        const deltaTime = Math.min((timestamp - this.lastTime) / 1000, 0.05);
        this.lastTime = timestamp;

        this.update(deltaTime);
        this.draw();
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.bgImg, 0, 0, this.canvas.width, this.canvas.height);

        this.ctx.save();
        const time = Date.now() / 1000;
        for (let i = 0; i < 5; i++) {
            const x = Math.sin(time * 0.3 + i * 1.5) * this.canvas.width;
            const y = this.canvas.height * (i / 5);
            const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, 1000);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0.01)');
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
        this.ctx.restore();

        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, this.canvas.height - 20, this.canvas.width, 20);
        this.ctx.fillRect(0, 0, this.canvas.width, 20);

        this.frameTimer++;
        if (this.frameTimer >= this.frameInterval) {
            this.currentFrame = (this.currentFrame + 1) % this.ratFrames.length;
            this.frameTimer = 0;
        }

        this.ctx.drawImage(
            this.ratFrames[this.currentFrame],
            this.player.getPosX(),
            this.player.getPosY(),
            this.player.getWidth(),
            this.player.getHeight()
        );

        for (const obstacle of this.obstaclesTop) {
            this.ctx.drawImage(
                this.obstacleTopImgs[obstacle.imgIndex],
                obstacle.getPosX(),
                obstacle.getPosY(),
                obstacle.getWidth(),
                obstacle.getHeight()
            );
        }

        for (const obstacle of this.obstaclesBottom) {
            this.ctx.drawImage(
                this.obstacleBottomImgs[obstacle.imgIndex],
                obstacle.getPosX(),
                obstacle.getPosY(),
                obstacle.getWidth(),
                obstacle.getHeight()
            );
        }

        this.ctx.fillStyle = 'white';
        this.ctx.font = '24px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`Score : ${this.currentLev.score}`, 20, 40);

        if (this.gameOver) {
            this.ctx.fillStyle = 'rgba(0,0,0,0.6)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = 'white';
            this.ctx.font = '60px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2);
            this.ctx.font = '30px Arial';
            this.ctx.fillText(`Score final : ${this.currentLev.score}`, this.canvas.width / 2, this.canvas.height / 2 + 60);
            this.ctx.font = '20px Arial';
            this.ctx.fillText('Appuyez sur ESPACE pour recommencer le niveau', this.canvas.width / 2, this.canvas.height / 2 + 100);
            this.ctx.fillText('Appuyez sur M pour retourner au menu', this.canvas.width / 2, this.canvas.height / 2 + 130);
        }
    }

    attachControls() {
        window.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                if (this.gameOver) {
                    this.startLevel(this.currentLevel);
                } else {
                    this.player.jump();
                }
            }
            if (e.code === 'KeyM') {
                window.location.href = 'index.html';
            }
        });

        window.addEventListener('mousedown', () => {
            if (this.gameOver) {
                this.startLevel(this.currentLevel);
            } else {
                this.player.jump();
            }
        });
    }

    async init() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        this.attachControls();
        await this.loadAssets();

        const urlParams = new URLSearchParams(window.location.search);
        const action = urlParams.get('action');
        const niveau = urlParams.get('niveau');

        if (action === 'reprendre') {
            const savedLevel = this.loadSavedLevel();
            if (savedLevel !== null) {
                this.startLevel(savedLevel);
            } else {
                alert('Aucune partie sauvegardée !');
                window.location.href = 'index.html';
            }
            return;
        }

        const level = niveau ? parseInt(niveau, 10) : 1;
        this.startLevel(level);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const game = new Game(canvas, ctx);
    game.init().catch(error => {
        console.error('Erreur lors du chargement du jeu :', error);
    });
});

