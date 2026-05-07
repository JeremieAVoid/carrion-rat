
function nouvellePartie() {
    window.location.href = 'jeu.html?niveau=1';
}

function reprendrePartie() {
    const sauvegarde = charger(); // fonction de chargement
    if (sauvegarde) {
        document.getElementById("menuScreen").style.display = "none";
        gameStarted = true;
        // appliquer la sauvegarde
    } else {
        alert("Aucune partie sauvegardée !");
    }
}

function choixNiveau() {
    window.location.href = 'choix_niveau.html';
}