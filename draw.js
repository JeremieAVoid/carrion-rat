function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Fond
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

    // Brouillard
    ctx.save();
    const time = Date.now() / 1000;

    for (let i = 0; i < 5; i++) {
        const x = (Math.sin(time * 0.3 + i * 1.5) * canvas.width);
        const y = canvas.height * (i / 5);
    
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 1000);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0.01)');
    
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }   

    ctx.restore();

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
            obstacleTopImgs[obstacle.imgIndex],
            obstacle.getPosX(),
            obstacle.getPosY(),
            obstacle.getWidth(),
            obstacle.getHeight()
        );
    }

    for (const obstacle of obstaclesBottom) {
        ctx.drawImage(
            obstacleBottomImgs[obstacle.imgIndex],
            obstacle.getPosX(),
            obstacle.getPosY(),
            obstacle.getWidth(),
            obstacle.getHeight()
        );
    }

    // Score
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText("Score : " + currentLev.score, 20, 40);
}