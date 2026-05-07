function lancerNiveau(n) {
    currentLevel = n;
    start(n);
    // adapter la difficulté selon n
}

function retourMenu() {
    document.getElementById("levelScreen").style.display = "none";
    document.getElementById("menuScreen").style.display = "flex";
}