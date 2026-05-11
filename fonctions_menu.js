const musicAccueil = document.getElementById("musicAccueil");
musicAccueil.play();

function nouvellePartie() {
    window.location.href = 'jeu.html?niveau=1';
}

function reprendrePartie() {
    const sauvegarde = localStorage.getItem("gameProgress");
    if (sauvegarde) {
        window.location.href = 'jeu.html?action=reprendre';
    } else {
        alert("Aucune partie sauvegardée !");
    }
}

function choixNiveau() {
    window.location.href = 'choix_niveau.html';
}