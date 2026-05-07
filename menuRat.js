window.addEventListener("load", () => {
    const canvas = document.getElementById("ratCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 800;
    canvas.height = 150;

    const ratFrames = [];
    const imgNames = ["images/rat_evil.png", "images/rat_evil_1.png", "images/rat_evil_2.png"];

    imgNames.forEach(name => {
        const img = new Image();
        img.src = name;
        ratFrames.push(img);
    });

    let x = -80;
    let currentFrame = 0;
    let frameTimer = 0;
    const frameInterval = 25;
    const speed = 1;

    function animateRat() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        frameTimer++;
        if (frameTimer >= frameInterval) {
            currentFrame = (currentFrame + 1) % ratFrames.length;
            frameTimer = 0;
        }

        ctx.drawImage(ratFrames[currentFrame], x, canvas.height - 70, 70, 70);
        x += speed;

        if (x > canvas.width + 80) x = -80;

        requestAnimationFrame(animateRat);
    }

    ratFrames[0].onload = () => {
        console.log("rat chargé, animation démarre");
        animateRat();
    };

    ratFrames[0].onerror = () => console.log("ERREUR: image non trouvée");
});
