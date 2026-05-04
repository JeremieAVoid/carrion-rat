// cette fonction permet de sauvegarder la progression du joueur 
function sauvegarder(niveau, score) {
    const currentData = charger() 

    let scoreFinal = currentData.bestScore
    if(score > scoreFinal) {
        scoreFinal = score
    } 

    let niveauFinal = currentData.currentLevel 
    if(niveau > niveauFinal) {
        niveauFinal = niveau
    }

    const progress = {
        currentLevel : niveauFinal,
        bestScore : scoreFinal
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
            bestScore: 0
        }
    }
}

// cette fonction permet de supprimer les données enregistrer en cas de reinstallisation de la partie
function supprimer() {
    localStorage.removeItem("gameProgress");
    localStorage.clear();
}