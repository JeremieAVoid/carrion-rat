class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
 
        this.animationId = null;

        this.bgImg = new Image();
        this.bgImg.src = "images/horror_level.png";
 
        this.ratFrames = [];
        this.obstacleImgs = [];
        this.obstacleImgsHeaven = [];
 
        this.heaven = false;
        this.currentFrame = 0;
        this.frameTimer = 0;
        this.frameInterval = 40;
        this.player = null;
        this.currentLev = null;
        this.obstaclesTop = [];
        this.obstaclesBottom = [];
        this.gameOver = false;
        this.gameEnded = false;
        this.pancarte = false;
        this.pancarteImg = new Image();
        this.pancarteImg.src = "images/pancarte.png";
        this.pancarteCharge = false;
        this.pancarteTimerStarted = false;
        this.pancarteImg.onload = () => {
            this.pancarteCharge = true;
        };
        this.lastTime = null;
 
        this.isBreak = false;
        
        this.isPaused = false;
        this.pauseButton = null;
        this.pauseOverlay = null;
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
        const srcNormal = [
            "images/obstacles_bottom_evil.png",
            "images/obstacles_bottom_evil_1.png",
            "images/obstacles_bottom_evil_2.png"
        ];
        const srcHeaven = [
            "images/pillarHeaven1.png",
            "images/pillarHeaven2.png",
            "images/pillarHeaven3.png"
        ];
        const ratSrc = [
            "images/rat_evil.png",
            "images/rat_evil_1.png",
            "images/rat_evil_2.png"
        ];

        const promises = [];
        promises.push(this.loadImage(this.bgImg.src).then(img => { this.bgImg = img; }));

        this.obstacleImgs = [];
        this.obstacleImgsHeaven = [];
        this.ratFrames = [];

        for (const chemin of srcNormal) {
            promises.push(this.loadImage(chemin).then(img => this.obstacleImgs.push(img)));
        }
        for (const chemin of srcHeaven) {
            promises.push(this.loadImage(chemin).then(img => this.obstacleImgsHeaven.push(img)));
        }
        for (const chemin of ratSrc) {
            promises.push(this.loadImage(chemin).then(img => this.ratFrames.push(img)));
        }

        await Promise.all(promises);
    }
 
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
 
    resetLevel(level) {
        const difficulty = getDifficulty(level);

        this.currentLev = new Level(difficulty);
        
        this.player = new Rat(100, this.canvas.height / 2, 75, 112);
        this.obstaclesBottom = this.currentLev.obstaclesBottom(this.canvas.width, this.canvas.height);
        this.obstaclesTop = this.currentLev.obstaclesTop(this.canvas.width, this.canvas.height);
        this.gameOver = false;
        this.gameEnded = false;
        this.pancarte = false;
        this.pancarteTimerStarted = false;
        this.lastTime = null;
        this.currentFrame = 0;
        this.frameTimer = 0;
        this.isPaused = false;
    }
 
    loadSavedLevel() {
        const sauvegarde = charger();
        return sauvegarde ? sauvegarde.currentLevel : null;
    }
 
    startLevel(level) {
        this.currentLevel = level;
        this.resetLevel(level);
        window.restartTimer();
        const musicJeu = document.getElementById("musicJeu");
        if (musicJeu) {
            musicJeu.currentTime = 0;
            musicJeu.volume = 0.1;
            musicJeu.play();
        }

        const ambianceJeu = document.getElementById("ambianceJeu");
        if (ambianceJeu) {
            ambianceJeu.currentTime = 0;
            ambianceJeu.volume = 0.6;
            ambianceJeu.play();
        }

        this.startLoop();
    }
 
    breakGame(){
        if (this.isBreak) {this.isBreak = true;}
        else {this.isBreak = false;}
        return this.update(this.lastTime,this.isBreak);
    }
 
    restartGame(){
        window.restartTimer();
        requestAnimationFrame(this.gameLoop.bind(this));
    }
 
    startLoop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.lastTime = null;
        this.animationId = requestAnimationFrame(this.gameLoop.bind(this));
    }
 
    togglePause() {
        this.isPaused = !this.isPaused;
        this.updatePauseUI();
        
        if (this.isPaused) {
            // Pause timer global
            if (window.pauseTimer) {
                window.pauseTimer();
            }
        } else {
            // Reprend timer
            if (window.resumeTimer) {
                window.resumeTimer();
            }
        }
    }
 
    updatePauseUI() {
        if (!this.pauseOverlay) {
            this.pauseOverlay = document.createElement('div');
            this.pauseOverlay.id = 'pauseOverlay';
            this.pauseOverlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                display: none;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                font-family: Arial, sans-serif;
            `;
            
            const pauseText = document.createElement('div');
            pauseText.id = 'pauseText';
            pauseText.style.cssText = `
                color: white;
                font-size: 48px;
                font-weight: bold;
                text-align: center;
            `;
            pauseText.innerHTML = `
                <div style="margin-bottom: 30px;">PAUSE</div>
                <div style="font-size: 20px; margin-bottom: 20px;">Le jeu est en pause</div>
                <div style="font-size: 16px;">Appuyez sur P ou cliquez sur le bouton pour reprendre</div>
            `;
            
            this.pauseOverlay.appendChild(pauseText);
            document.body.appendChild(this.pauseOverlay);
        }
        
        // Affiche ou cache l'overlay
        this.pauseOverlay.style.display = this.isPaused ? 'flex' : 'none';
        
        // Change le texte du bouton
        if (this.pauseButton) {
            this.pauseButton.textContent = this.isPaused ? 'Reprendre' : 'Pause';
        }
    }
 
    update(deltaTime, b = false) {
        if (this.gameOver) return;
        if (b) return;
    
        if (this.isPaused) return;

        // Utiliser la variable globale temps du timer
        if (window.getTemps() <= 0 && !this.gameEnded) {
            this.gameEnded = true;
        }
 
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
                window.pauseTimer()
                sauvegarder(this.currentLev.intensity, this.currentLev.score);
            }
        }

        // Tant que jeu non fini, continuer génération
        if (!this.gameEnded && (this.obstaclesTop.length === 0 || this.obstaclesBottom.length === 0)) {
            this.obstaclesBottom = this.currentLev.obstaclesBottom(this.canvas.width, this.canvas.height);
            this.obstaclesTop = this.currentLev.obstaclesTop(this.canvas.width, this.canvas.height);
        }

        if (this.gameEnded && !this.pancarte && this.obstaclesTop.length === 0 && this.obstaclesBottom.length === 0) {
            this.pancarte = true;
            if (!this.pancarteTimerStarted) {
                this.pancarteTimerStarted = true;
                
                const goToNext = isGoHell(this.player);
                const targetLevel = goToNext ? this.currentLevel + 1 : Math.max(1, this.currentLevel - 1);
                
                sauvegarder(targetLevel, this.currentLev.score);

                setTimeout(() => {
                    this.nextLevel(goToNext, this.currentLevel);
                }, 1500);
            }
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
        this.animationId = requestAnimationFrame(this.gameLoop.bind(this)); // ← ajout animationId
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

        if (!this.gameOver) {
            this.frameTimer++;
            if (this.frameTimer >= this.frameInterval) {
                this.currentFrame = (this.currentFrame + 1) % this.ratFrames.length;
                this.frameTimer = 0;
            }
        }

        this.ctx.drawImage(
            this.ratFrames[this.currentFrame],
            this.player.getPosX(),
            this.player.getPosY(),
            this.player.getWidth(),
            this.player.getHeight()
        );
        
        let oBI = this.obstacleImgs;
        if (this.heaven){
            oBI = this.obstacleImgsHeaven;
        }

        for (const obstacle of this.obstaclesTop) {
            this.ctx.save();
            
            const x = obstacle.getPosX();
            const y = obstacle.getPosY();
            const w = obstacle.getWidth();
            const h = obstacle.getHeight();

            this.ctx.translate(x, y);
            this.ctx.scale(1, -1);
            this.ctx.drawImage(
                oBI[obstacle.imgIndex],
                0,
                -h,
                w,
                h
            );
            
            this.ctx.restore();
        }

        for (const obstacle of this.obstaclesBottom) {
            this.ctx.drawImage(
                oBI[obstacle.imgIndex],
                obstacle.getPosX(),
                obstacle.getPosY(),
                obstacle.getWidth(),
                obstacle.getHeight()
            );
        }
 
        if (this.pancarte && this.pancarteCharge) {
            const groundY = this.canvas.height - 20;
            const ratio = (this.player.getWidth() * 1.2) / this.pancarteImg.width;
            const signWidth = this.pancarteImg.width * ratio;
            const signHeight = this.pancarteImg.height * ratio;
            const signX = this.canvas.width - this.pancarteImg.width-20;
            const signY = groundY - signHeight;
            this.ctx.drawImage(this.pancarteImg, signX, signY, signWidth, signHeight);
        }
 
        this.ctx.fillStyle = 'white';
        this.ctx.font = '24px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`Score : ${this.currentLev.score}`, 20, 40);

        if (this.gameOver) {
            this.ctx.fillStyle = 'rgba(77, 38, 22, 0.4)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            this.ctx.fillStyle = '#a9301d97';
            this.ctx.font = 'bold 70px "Courier New"';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('☠ GAME OVER ☠', this.canvas.width / 2, this.canvas.height / 2 - 20);

            this.ctx.fillStyle = '#ff2d2dca';
            this.ctx.font = '28px "Courier New"';
            this.ctx.fillText(`Score final : ${this.currentLev.score}`, this.canvas.width / 2, this.canvas.height / 2 + 50);

            this.ctx.fillStyle = '#888';
            this.ctx.font = '18px "Courier New"';
            this.ctx.fillText('[ ESPACE ] Recommencer', this.canvas.width / 2, this.canvas.height / 2 + 100);
            this.ctx.fillText('[ M ] Menu principal', this.canvas.width / 2, this.canvas.height / 2 + 130);
        }
    }
 
    attachControls() {
        window.addEventListener('keydown', (e) => {
            if (e.code === 'KeyP') {
                if (!this.gameOver && !this.gameEnded) {
                    this.togglePause();
                }
            }
            
            if (e.code === 'Space') {
                if (this.gameOver) {
                    this.startLevel(this.currentLevel);
                } else if (!this.isPaused) {
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
            } else if (!this.isPaused) {
                this.player.jump();
            }
        });
        
        this.pauseButton = document.getElementById('pauseButton');
        if (this.pauseButton) {
            
            this.pauseButton.addEventListener('click', () => {
                if (!this.gameOver && !this.gameEnded) {
                    this.togglePause();
                }
            });
            
            this.pauseButton.addEventListener('mouseover', () => {
                this.pauseButton.style.background = 'rgba(200, 50, 50, 1)';
                this.pauseButton.style.transform = 'scale(1.05)';
            });
            
            this.pauseButton.addEventListener('mouseout', () => {
                this.pauseButton.style.background = 'rgba(200, 50, 50, 0.8)';
                this.pauseButton.style.transform = 'scale(1)';
            });
        }
    }
 
    async init() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        this.attachControls();

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

        let levelId = 4; 
        if (niveau) {
            if (!isNaN(niveau)) {
                levelId = parseInt(niveau, 10);
            } else if (LEVELS_MAP[niveau]) {
                levelId = LEVELS_MAP[niveau].id;
                if (levelId < 4) {
                    this.heaven = true;
                    this.bgImg.src = "images/backgroundHeaven.png";
                } else {
                    this.heaven = false;
                    this.bgImg.src = "images/backgroundHorror.png";
                }
            }
        }
        await this.loadAssets();
        this.startLevel(levelId);
        const pageActuelle = window.location.pathname.split('/').pop(); 
        window.history.replaceState({}, '', pageActuelle);
    }
 
    nextLevel(goToNext, levelNumber) {
        let goHell = true;
        if (typeof isGoHell === 'function' && this.player) {
            goHell = isGoHell(this.player);
        }
        let targetLevelId = levelNumber;
        if (goHell) {
            targetLevelId = levelNumber + 1;
        } else {
            targetLevelId = levelNumber - 1;
        }
        targetLevelId = Math.max(1, Math.min(9, targetLevelId));
        let targetLevelKey = "classic1";
        for (let key in LEVELS_MAP) {
            if (LEVELS_MAP[key].id === targetLevelId) {
                targetLevelKey = key;
                break;
            }
        }
        if (typeof sauvegarder === 'function') {
            const score = this.currentLev ? this.currentLev.score : 0;
            sauvegarder(targetLevelKey, score);
        }
        window.location.href = `jeu.html?niveau=${targetLevelKey}`;
    }
}
 
window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    window.game = new Game(canvas, ctx); // ← window.game
    window.game.init().catch(error => {
        console.error('Erreur lors du chargement du jeu :', error);
    });
});
