function start(n){
    let gameStarted = true;
    let currentLevel = n;

    const bgImg = new Image();
    bgImg.src = "images/horror_level.png"; 
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    const obstacleTopImgs = [];
    const obsTop1 = new Image(); obsTop1.src = "images/obstacles_top_evil.png";
    const obsTop2 = new Image(); obsTop2.src = "images/obstacles_top_evil_1.png";
    const obsTop3 = new Image(); obsTop3.src = "images/obstacles_top_evil_2.png";
    obstacleTopImgs.push(obsTop1, obsTop2, obsTop3);

    const obstacleBottomImgs = [];
    const obsBot1 = new Image(); obsBot1.src = "images/obstacles_bottom_evil.png";
    const obsBot2 = new Image(); obsBot2.src = "images/obstacles_bottom_evil_1.png";
    const obsBot3 = new Image(); obsBot3.src = "images/obstacles_bottom_evil_2.png";
    obstacleBottomImgs.push(obsBot1, obsBot2, obsBot3);

    // Image du rat
    const ratFrames = [];
    const ratImg1 = new Image();
    const ratImg2 = new Image();
    const ratImg3 = new Image();
    ratImg1.src = "images/rat_evil.png";
    ratImg2.src = "images/rat_evil_1.png";
    ratImg3.src = "images/rat_evil_2.png";
    ratFrames.push(ratImg1, ratImg2, ratImg3);

        
    let currentFrame = 0;
    let frameTimer = 0;
    const frameInterval = 30;

    // Joueur et niveau
    const player = new Rat(100, canvas.height / 2, 100, 150);
    const lev = new Level(n);
    let obstaclesBottom = lev.obstaclesBottom(canvas.width, canvas.height);
    let obstaclesTop = lev.obstaclesTop(canvas.width, canvas.height);
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
    
    let lastTime = null;

        
    let imagesChargees = 0;

    ratImg1.onload = imageChargee(imagesChargees);
    ratImg2.onload = imageChargee(imagesChargees);
    ratImg3.onload = imageChargee(imagesChargees);
    bgImg.onload = imageChargee(imagesChargees);
    obsTop1.onload = imageChargee(imagesChargees);
    obsTop2.onload = imageChargee(imagesChargees);
    obsTop3.onload = imageChargee(imagesChargees);
    obsBot1.onload = imageChargee(imagesChargees);
    obsBot2.onload = imageChargee(imagesChargees);
    obsBot3.onload = imageChargee(imagesChargees);

    ratImg1.onerror = () => console.error("ratImg1 introuvable");
    ratImg2.onerror = () => console.error("ratImg2 introuvable");
    ratImg3.onerror = () => console.error("ratImg3 introuvable");
    bgImg.onerror = () => console.error("bgImg introuvable");
    obsTop1.onerror = () => console.error("obsTop1 introuvable");
    obsTop2.onerror = () => console.error("obsTop2 introuvable");
    obsTop3.onerror = () => console.error("obsTop3 introuvable");
    obsBot1.onerror = () => console.error("obsBot1 introuvable");
    obsBot2.onerror = () => console.error("obsBot2 introuvable");
    obsBot3.onerror = () => console.error("obsBot3 introuvable");

}