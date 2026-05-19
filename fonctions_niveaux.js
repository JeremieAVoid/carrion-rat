function lancerNiveau(n) {
    let difficulty;
    
    if (typeof n === 'string') {
        difficulty = getDifficulty(n);
    } else if (typeof n === 'number') {
        difficulty = getDifficulty(n);
    } else {
        difficulty = 6;
    }
    
    currentLevel = difficulty;
    start(difficulty);
}

function retourMenu() {
    document.getElementById("levelScreen").style.display = "none";
    document.getElementById("menuScreen").style.display = "flex";
}