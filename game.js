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
const player = {
    x: 100,
    y: canvas.height / 2,
    width: 150,
    height: 350,
    velocityY: 0,
    gravity: 800,
    jumpForce: -350
};

//obstacle

const obstacle = {
    x: canvas.width,
    y: canvas.height - 150,
    width: 50,
    height: 150,
    speed: 300
};

window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        player.velocityY = player.jumpForce;
    }
});
