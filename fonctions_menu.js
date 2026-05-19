const musicAccueil = document.getElementById("musicAccueil");
musicAccueil.play();

function nouvellePartie() {
    window.location.href = 'jeu.html?niveau=classic1';
}

function reprendrePartie() {
    const sauvegarde = localStorage.getItem("gameProgress");
    if (sauvegarde) {
        const data = JSON.parse(sauvegarde);
        window.location.href = `jeu.html?action=reprendre`;
    } else {
        alert("Aucune partie sauvegardée !");
    }
}

function choixNiveau() {
    window.location.href = 'choix_niveau.html';
}