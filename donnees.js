const LEVELS_MAP = {
    "heaven3": { id: 1, difficulty: 1 },
    "heaven2": { id: 2, difficulty: 3 },
    "heaven1": { id: 3, difficulty: 5 },
    "classic1": { id: 4, difficulty: 6 },
    "classic2": { id: 5, difficulty: 7 },
    "classic3": { id: 6, difficulty: 8 },
    "hell1": { id: 7, difficulty: 10 },
    "hell2": { id: 8, difficulty: 12 },
    "hell3": { id: 9, difficulty: 15 }
};

// cette fonction permet de sauvegarder la progression du joueur 
function sauvegarder(niveau, score) {
    const currentData = charger();

    let niveauFinalDébloqué = currentData.unlockedLevel || [4]; 
    
    let levelData = LEVELS_MAP[niveau] || LEVELS_MAP["classic1"];
    let idNiveauActuel = levelData.id;
    let difficultyActuelle = levelData.difficulty;

    if (idNiveauActuel > 0 && !niveauFinalDébloqué.includes(idNiveauActuel)) {
        niveauFinalDébloqué.push(idNiveauActuel);
        niveauFinalDébloqué.sort((a, b) => a - b); 
    }

    let scoreFinal = currentData.bestScore || 0;
    if (score > scoreFinal) {
        scoreFinal = score;
    } 

    let niveauStocke = currentData.currentLevel || 4;
    let idNiveauFinal = niveauStocke;

    if (idNiveauActuel > idNiveauFinal) {
        idNiveauFinal = idNiveauActuel;
    }

    const progress = {
        unlockedLevel: niveauFinalDébloqué,
        bestScore: scoreFinal, 
        currentLevel: idNiveauFinal
    };

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
            currentLevel : 4,
            unlockedLevel : [4],
            bestScore: 0
        }
    }
}

// cette fonction permet de supprimer les données enregistrer en cas de reinstallisation de la partie
function supprimer() {
    localStorage.removeItem("gameProgress");
    localStorage.clear();
}

function getDifficulty(niveau) {
    if (typeof niveau === 'number') {
        for (let key in LEVELS_MAP) {
            if (LEVELS_MAP[key].id === niveau) {
                return LEVELS_MAP[key].difficulty;
            }
        }
        return 6;
    } else {
        return LEVELS_MAP[niveau]?.difficulty || 6;
    }
}

function getLevelId(levelName) {
    return LEVELS_MAP[levelName]?.id || 4;
}