// cette fonction permet de sauvegarder la progression du joueur 
function sauvegarder(niveau, score) {
    const currentData = charger() 

    let niveauFinalDébloqué = currentData.unlockedLevel
    if(!niveauFinalDébloqué.includes(niveau + 1) && niveau + 1 <= 6) {
        niveauFinalDébloqué.push(niveau + 1)
    }

    let scoreFinal = currentData.bestScore
    if(score > scoreFinal) {
        scoreFinal = score
    } 

    let niveauFinal = currentData.currentLevel 
    if(niveau > niveauFinal) {
        niveauFinal = niveau
    }

    const progress = {
        unlockedLevel : niveauFinalDébloqué,
        bestScore : scoreFinal, 
        currentLevel : niveauFinal
    }
    localStorage.setItem("gameProgress", JSON.stringify(progress)); 
}

// cette fonction permet de charger la progression du joueur 
function charger() {
    const storedDataLocal = localStorage.getItem("gameProgress") 
    if(storedDataLocal) {
        const dataLocal = JSON.parse(storedDataLocal);
        return dataLocal
    } else {
        return {
            currentLevel : 1,
            unlockedLevel : [1],
            bestScore: 0
        }
    }
}

// cette fonction permet de supprimer les données enregistrer en cas de reinstallisation de la partie
function supprimer() {
    localStorage.removeItem("gameProgress");
    localStorage.clear();
}